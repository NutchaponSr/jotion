import { create } from "zustand";

type LayoutStore = {
  isOpenToolbarFilter: boolean;
  onOpenToolbarFilter: () => void;
  onCloseToolbarFilter: () => void;
  onToggleToolbarFilter: () => void;
}

export const useLayout = create<LayoutStore>((set) => ({
  isOpenToolbarFilter: false,
  onOpenToolbarFilter: () => set({ isOpenToolbarFilter: true }),
  onCloseToolbarFilter: () => set({ isOpenToolbarFilter: false }),
  onToggleToolbarFilter: () => set((state) => ({ isOpenToolbarFilter: !state.isOpenToolbarFilter })),
}));