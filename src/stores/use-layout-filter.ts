import { create } from "zustand";

import { LayoutFilterStore } from "@/types/layouts";

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
    columns: state.columns.map((col) => col.id === id ? { ...col, isFilter: true } : col)
  })),
  removeFilter: (id) => set((state) => ({
    columns: state.columns.map((col) => col.id === id ? { ...col, isFilter: false } : col)
  })),
}));