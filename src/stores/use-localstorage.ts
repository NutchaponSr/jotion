import { create } from "zustand";
import { persist } from "zustand/middleware";

import { LocalStorageStore } from "@/types/localstorage";

export const useLocalStorage = create<LocalStorageStore>()(
  persist((set) => ({
    isOpenSidebar: true,
    onToggleSidebar: () => set((state) => ({ isOpenSidebar: !state.isOpenSidebar })),
  }), {
    name: "settings",
  })
)