import { create } from "zustand";

import { LayoutStore } from "@/modules/ui/layouts/types/layouts";

export const useLayout = create<LayoutStore>((set) => ({
  isOpenToolbarFilter: false,
  onOpenToolbarFilter: () => set({ isOpenToolbarFilter: true }),
  onCloseToolbarFilter: () => set({ isOpenToolbarFilter: false }),
  onToggleToolbarFilter: () => set((state) => ({ isOpenToolbarFilter: !state.isOpenToolbarFilter })),
}));

