import { create } from "zustand";
import { persist } from "zustand/middleware";

import { LayoutType } from "@/types/layouts";

type SettingsStore = {
  layout: LayoutType;
  onChangeLayout: (layout: LayoutType) => void;
}

export const useSetting = create<SettingsStore>()(
  persist(
    (set) => ({
      layout: "table",
      onChangeLayout: (layout) => set({ layout }),
    }),
    {
      name: "settings",
    }
  )
);