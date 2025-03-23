import { create } from "zustand";

import { viewOptionStore } from "@/modules/ui/layouts/types/layouts";

export const useViewOption = create<viewOptionStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ type, isOpen: true }),
  onClose: () => set({ type: null, isOpen: false }),
}));