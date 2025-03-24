import { create } from "zustand";
import { persist } from "zustand/middleware";

import { LayoutType, PageView } from "@/modules/ui/layouts/types/layouts";

type SettingsStore = {
  pageView: PageView;
  layout: LayoutType;
  showIcon: boolean;
  showVerticalLine: boolean;
  onChangeViewPage: (pageView: PageView) => void;
  onChangeLayout: (layout: LayoutType) => void;
  onSwitchIcon: () => void;
  onSwitchVerticalLine: () => void;
}

export const useSetting = create<SettingsStore>()(
  persist(
    (set) => ({
      pageView: "side",
      layout: "table",
      showIcon: true,
      showVerticalLine: true,
      onChangeViewPage: (pageView) => set({ pageView }),
      onChangeLayout: (layout) => set({ layout }),
      onSwitchIcon: () => set((state) => ({ showIcon: !state.showIcon })),
      onSwitchVerticalLine: () => set((state) => ({ showVerticalLine: !state.showVerticalLine })),
    }),
    {
      name: "settings",
    }
  )
);