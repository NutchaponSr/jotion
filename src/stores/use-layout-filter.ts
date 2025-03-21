import { create } from "zustand";

import { 
  FilterCondition,
  LayoutFilterStore, 
  SortOrder
} from "@/types/layouts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useLayoutFilter = create<LayoutFilterStore<any>>((set) => ({
  // Base State
  columns: [],
  setColumns: (columns) => set({ columns }),

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
      isFilter: false, 
      searchQuery: "", 
      filterCondition: FilterCondition.CONTAINS 
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
  onSearchQuery: (query) => set((state) => ({
    columns: state.columns.map((col) => ({ 
      ...col, 
      filter: { 
        ...col.filter, 
        searchQuery: query 
      },
    })),
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
}));