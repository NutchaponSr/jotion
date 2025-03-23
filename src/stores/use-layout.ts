import { create } from "zustand";

type LayoutStore = {
  isOpenToolbarFilter: boolean;
  isOpenViewOption: boolean;
  onOpenToolbarFilter: () => void;
  onCloseToolbarFilter: () => void;
  onCloseViewOption: () => void;
  onToggleToolbarFilter: () => void;
  onToogleViewOption: () => void;
}

export const useLayout = create<LayoutStore>((set) => ({
  isOpenToolbarFilter: false,
  isOpenViewOption: false,
  onOpenToolbarFilter: () => set({ isOpenToolbarFilter: true }),
  onCloseToolbarFilter: () => set({ isOpenToolbarFilter: false }),
  onCloseViewOption: () => set({ isOpenViewOption: false }),
  onToggleToolbarFilter: () => set((state) => ({ isOpenToolbarFilter: !state.isOpenToolbarFilter })),
  onToogleViewOption: () => set((state) => ({ isOpenViewOption: !state.isOpenViewOption })),
}));