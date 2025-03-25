import { create } from "zustand";

import { 
  FilterCondition,
  GroupingProps,
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
  addGrouping: (column) => set(() => ({ groupingColumn: column })),
  removeGrouping: () => set(() => ({ groupingColumn: null })),
  reorderGrouping: (headers) => set((state) => {
    const updatedHeaders = { ...state.groupingHeaders };

    headers.forEach((header, index) => {
      if (updatedHeaders[header].isShow) {
        updatedHeaders[header].order = (index + 1) * 100;
      }
    });

    return { groupingHeaders: updatedHeaders };
  }),
  setGroupingHeader: (headers) => set(() => ({
    groupingHeaders: headers.reduce((acc, header, index) => ({
      ...acc,
      [header]: {
        isOpen: false,
        isShow: true,
        order: (index + 1) * 100,
      },
    }), {}),
  })),
  toggleGroupVisible: (header) => set((state) => {
    const currentHeaders = state.groupingHeaders;
    const isCurrentlyVisible = currentHeaders[header]?.isShow !== false;
    
    // Step 1: Create a list of all headers
    const allHeaders = Object.keys(currentHeaders);
    
    // Step 2: Separate visible and hidden headers (excluding the one being toggled)
    const visibleHeaders = allHeaders.filter(h => 
      h !== header && currentHeaders[h]?.isShow !== false
    );
    
    const hiddenHeaders = allHeaders.filter(h => 
      h !== header && currentHeaders[h]?.isShow === false
    );
    
    // Step 3: Determine the new arrays based on the toggle action
    let newVisibleHeaders;
    let newHiddenHeaders;
    
    if (isCurrentlyVisible) {
      // We're hiding this header
      newVisibleHeaders = visibleHeaders;
      newHiddenHeaders = [...hiddenHeaders, header];
    } else {
      // We're showing this header
      newVisibleHeaders = [...visibleHeaders, header]; // Add to end of visible list
      newHiddenHeaders = hiddenHeaders.filter(h => h !== header);
    }
    
    // Step 4: Create the updated headers object with new orders
    const updatedHeaders = { ...currentHeaders };
    
    // Update visible headers with sequential order
    newVisibleHeaders.forEach((h, index) => {
      updatedHeaders[h] = {
        ...updatedHeaders[h],
        isShow: true,
        order: (index + 1) * 100
      };
    });
    
    // Update hidden headers with order 0
    newHiddenHeaders.forEach(h => {
      updatedHeaders[h] = {
        ...updatedHeaders[h],
        isShow: false,
        order: 0
      };
    });
    
    // Step 5: Update the header being toggled
    updatedHeaders[header] = {
      ...updatedHeaders[header],
      isShow: !isCurrentlyVisible,
      order: !isCurrentlyVisible ? (newVisibleHeaders.length) * 100 : 0
    };
    
    return {
      groupingHeaders: updatedHeaders
    };
  }),
  showAllHeaders: () => set((state) => {
    // Get only visible headers and sort them by their current order
    const visibleHeaders = Object.entries(state.groupingHeaders)
      .filter(([, value]) => value.isShow)
      .sort(([, a], [, b]) => a.order - b.order);
  
    // Assign new sequential orders to visible headers
    const orderedHeaders = visibleHeaders.reduce((acc, [key, value], index) => {
      acc[key] = { ...value, order: (index + 1) * 100 };
      return acc;
    }, {} as Record<string, GroupingProps>);
  
    // Get hidden headers and append them at the end
    let newOrder = visibleHeaders.length * 100;
    const allHeaders = Object.entries(state.groupingHeaders).reduce((acc, [key, value]) => {
      if (!value.isShow) {
        newOrder += 100; // Place hidden headers at the end
        acc[key] = { ...value, isShow: true, order: newOrder };
      } else {
        acc[key] = orderedHeaders[key]; // Keep the updated visible headers
      }
      return acc;
    }, {} as Record<string, GroupingProps>);
  
    return { groupingHeaders: allHeaders };
  }),
  
  hideAllHeaders: () => set((state) => {
    const currentHeaders = Object.keys(state.groupingHeaders);
    
    // Create updated headers with all hidden and order 0
    const updatedHeaders = currentHeaders.reduce((acc, header) => {
      return {
        ...acc,
        [header]: {
          ...state.groupingHeaders[header],
          isShow: false,
          order: 0
        }
      };
    }, {});
    
    return {
      groupingHeaders: updatedHeaders
    };
  }),
}));