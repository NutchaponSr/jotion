import { create } from "zustand";

import { LayoutStore } from "@/modules/ui/layouts/types/layouts";

export const useLayout = create<LayoutStore>((set) => ({
  isOpenToolbarFilter: false,
  isOpenViewOption: false,
  onOpenToolbarFilter: () => set({ isOpenToolbarFilter: true }),
  onCloseToolbarFilter: () => set({ isOpenToolbarFilter: false }),
  onCloseViewOption: () => set({ isOpenViewOption: false }),
  onToggleToolbarFilter: () => set((state) => ({ isOpenToolbarFilter: !state.isOpenToolbarFilter })),
  onToogleViewOption: () => set((state) => ({ isOpenViewOption: !state.isOpenViewOption })),
}));

