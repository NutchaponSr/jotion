import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeType = "light" | "dark" | "system";

type SettingStore = {
  theme: ThemeType;
  onTheme: (theme: ThemeType) => void; 
}

export const useSettings = create<SettingStore>()(
  persist((set) => ({
    theme: "light",
    onTheme: (theme) => set({ theme }),
  }), {
    name: "settings",
  }),
);