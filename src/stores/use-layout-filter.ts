import { create } from "zustand";

import { 
  FilterCondition,
  LayoutFilterStore 
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
        isSort: true,
        sort: {
          ...col.sort,
          order: maxOrder + 100
        }
      } : col)
    };
  }),
  removeSort: (id) => set((state) => ({
    columns: state.columns.map((col) => col.id === id ? { 
      ...col, 
      sort: {
        isSort: false,
        order: 0,
        sortBy: "asc"
      }
    } : col)
  })),
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
}));