import { create } from "zustand";

import { 
  FilterCondition,
  GroupingProps,
  groupOptionCatalog,
  LayoutFilterStore, 
  SortOrder
} from "@/modules/ui/layouts/types/layouts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useLayoutFilter = create<LayoutFilterStore<any>>((set) => ({
  // Base State
  columns: [],
  setColumns: (columns) => set({ columns: columns.map((column, index) => ({
      ...column,
      order: (index + 1) * 100,
    })), 
  }),

  // Filter
  isOpenFilter: false,
  onOpenFilter: () => set({ isOpenFilter: true }),
  onCloseFilter: () => set({ isOpenFilter: false }),
  addFilter: (id) => set((state) => ({
    columns: state.columns.map((col) => col.id === id ? { 
      ...col, 
      filter: {
        ...col.filter,
        isFilter: true,
      },
    } : col)
  })),
  removeFilter: (id) => set((state) => ({
    columns: state.columns.map((col) => col.id === id ? { 
      ...col, 
      filter: {
        isFilter: false, 
        searchQuery: "", 
        condition: FilterCondition.CONTAINS 
      },
    } : col)
  })),
  onCondition: (id, condition) => set((state) => ({
    columns: state.columns.map((col) => col.id === id ? { 
      ...col, 
      filter: {
        ...col.filter,
        condition,
      },
    } : col)
  })),
  onSearchQuery: (query, id) => set((state) => ({
    columns: state.columns.map((column) => column.id === id ? {
      ...column,
      filter: {
        ...column.filter,
        searchQuery: query,
      }
    } : column),
  })),

  // Sort
  isOpenSort: false,
  onOpenSort: () => set({ isOpenSort: true }),
  onCloseSort: () => set({ isOpenSort: false }),
  addSort: (id) => set((state) => {
    const maxOrder = Math.max(...state.columns.map((column) => column.sort.order));
    return {
      columns: state.columns.map((col) => col.id === id ? { 
        ...col, 
        sort: {
          ...col.sort,
          isSort: true,
          order: maxOrder + 100
        }
      } : col)
    };
  }),
  removeSort: (id) => set((state) => {
    const updatedColumns = state.columns.map((column) => column.id === id ? { 
      ...column, 
      sort: {
        isSort: false,
        order: 0,
        sortBy: "asc" as SortOrder,
      }, 
    } : column);

    const sortColumn = updatedColumns
      .filter((column) => column.sort.isSort)
      .sort((a, b) => a.sort.order - b.sort.order);
      
    sortColumn.forEach((column, index) => {
      column.sort.order = (index + 1) * 100;
    });

    return { columns: updatedColumns }
  }),
  removeSortAll: () => set((state) => ({
    columns: state.columns.map((col) => ({ 
      ...col, 
      sort: {
        ...col.sort,
        isSort: false,
        order: 0, 
      }
    }))
  })),
  sortReorder: (columns) => set(() => ({
    columns: columns.map((column, index) => ({ 
      ...column, 
      sort: {
        ...column.sort,
        order: (index + 1) * 100,
      },
    })),
  })),
  onSortBy: (id, sortBy) => set((state) => ({
    columns: state.columns.map((col) => col.id === id ? { 
      ...col, 
      sort: {
        ...col.sort,
        sortBy,
      },
    } : col),
  })),
  onChangeSort: (id1, id2) => set((state) => {
    const columns = [...state.columns];
  
    const index1 = columns.findIndex(col => col.id === id1);
    const index2 = columns.findIndex(col => col.id === id2);
  
    if (index1 !== -1 && index2 !== -1) {
      [columns[index1].sort, columns[index2].sort] = [columns[index2].sort, columns[index1].sort];
    }
  
    return { columns };
  }),

  // Properties
  selectedRows: new Set<string>(),
  hideAllColumns: () => set((state) => ({
    columns: state.columns.map((column) => column.isLock ? column : { ...column, isHide: true, order: 0 }),
  })),
  showAllColumns: () => set((state) => {
    let order = Math.max(...state.columns.filter((column) => !column.isHide).map((column) => column.order), 0);

    return {
      columns: state.columns.map((column) => column.isHide ? { 
        ...column, 
        isHide: false, 
        order: order += 100, 
      } : {
        ...column,
        isHide: false,
      })
      .sort((a, b) => a.order - b.order)
      .map((column, index) => ({ ...column, order: (index + 1) * 100 }))
    };
  }),
  toggleColumnVisible: (id) => set((state) => {
    const maxOrder = Math.max(...state.columns.filter((column) => !column.isHide).map((column) => column.order), 0);
    const updated = state.columns.map((column) => column.id === id ? {
      ...column,
      isHide: !column.isHide,
      order: column.isHide ? maxOrder + 100 : 0,
    }: column);
    const visible = updated.filter((column) => !column.isHide).sort((a, b) => a.order - b.order);
    visible.forEach((column, index) => column.order = (index + 1) * 100);
    return { columns: updated };
  }),
  toggleAllSelection: (ids) => set((state) => {
    const selectedRows = new Set(state.selectedRows);
    const allSelected = ids.every((id) => selectedRows.has(id));

    if (allSelected) ids.forEach((id) => selectedRows.delete(id));
    else ids.forEach((id) => selectedRows.add(id));

    return { selectedRows };
  }),
  toggleRowSelection: (id) => set((state) => {
    const selectedRows = new Set(state.selectedRows);

    if (selectedRows.has(id)) selectedRows.delete(id);
    else selectedRows.add(id);

    return { selectedRows };
  }),
  reorderColumn: (columns) => set(() =>  ({
    columns: columns.map((column, index) => ({
      ...column,
      order: (index + 1) * 100,
    })),
  })),

  // Grouping
  groupingColumn: null,
  groupingHeaders: {},
  groupingOptions: { by: "", sort: "" },
  addGrouping: (column) => set(() => { 
    const options = groupOptionCatalog[column.type];
          
    const initialOptions: Record<string, string> = Object.keys(options).reduce((acc, key) => {
      const category = options[key as keyof typeof options];
      const firstOptionKey = Object.keys(category?.options ?? {})[1];
      acc[key] = firstOptionKey; 
      return acc;
    }, {} as Record<string, string>);
    
    return {
      groupingColumn: column,
      groupingOptions: initialOptions,
    }
  }),
  removeGrouping: () => set(() => ({ groupingColumn: null })),
  reorderGrouping: (headers) => set((state) => {
    const groupingHeaders = { ...state.groupingHeaders };

    headers.forEach((header, index) => {
      if (groupingHeaders[header].isShow) {
        groupingHeaders[header].order = (index + 1) * 100;
      }
    });

    return { groupingHeaders };
  }),
  setGrouping: (headers) => set(() => {
    return {
      groupingHeaders: headers.reduce(
        (acc, header, index) => ({
          ...acc,
          [header]: {
            isOpen: false,
            isShow: true,
            order: (index + 1) * 100,
          },
        }),
        {} as Record<string, GroupingProps>
      ),
    };
  }),
  
  toggleGroupVisible: (header) => set((state) => {
    const groupingHeaders = { ...state.groupingHeaders };
    const isCurrentlyVisible = groupingHeaders[header].isShow;

    groupingHeaders[header] = {
      ...groupingHeaders[header],
      isShow: !isCurrentlyVisible,
      order: isCurrentlyVisible ? 0 : (Object.values(groupingHeaders).filter((header) => header.isShow).length + 1) * 100,
    };

    let order = 100;
    Object.entries(groupingHeaders)
      .filter(([, value]) => value.isShow)
      .sort(([, a], [, b]) => a.order - b.order)
      .forEach(([key]) => {
        groupingHeaders[key].order = order;
        order += 100;
      });

    return { groupingHeaders };
  }),
  showAllHeaders: () => set((state) => {
    const groupingHeaders = { ...state.groupingHeaders };
    const visibleHeaders = Object.keys(groupingHeaders)
      .filter((key) => groupingHeaders[key].isShow)
      .sort((a, b) => groupingHeaders[a].order - groupingHeaders[b].order)

    visibleHeaders.forEach((header, index) => {
      groupingHeaders[header].order = (index + 1) * 100;
    });

    Object.keys(groupingHeaders)
      .filter((key) => !groupingHeaders[key].isShow)
      .forEach((header, index) => {
        groupingHeaders[header] = {
          ...groupingHeaders[header],
          isShow: true,
          order: (visibleHeaders.length + index + 1) * 100,
        };
      });

    return { groupingHeaders };
  }),
  hideAllHeaders: () => set((state) => ({
    groupingHeaders: Object.keys(state.groupingHeaders).reduce((acc, key) => ({
      ...acc,
      [key]: { ...state.groupingHeaders[key], isShow: false, order: 0 },
    }), {}),
  })),
  onOption: (key, value) => set((state) => ({
    groupingOptions: {
      ...state.groupingOptions,
      [key]: value
    }
  }))
}));