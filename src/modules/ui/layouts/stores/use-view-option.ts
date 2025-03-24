import { create } from "zustand";

import { viewOptionStore } from "@/modules/ui/layouts/types/layouts";

export const useViewOption = create<viewOptionStore>((set) => ({
  type: null,
  isOpen: false,
  onBack: () => set({ type: null }),
  onOpen: (type) => set({ type, isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onToggle: () => set((state) => ({ type: null, isOpen: !state.isOpen })),
}));