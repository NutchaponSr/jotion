"use client";

import { 
  ThemeProvider as NextThemeProvider, 
} from "next-themes";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      forcedTheme={undefined}
      enableSystem
      enableColorScheme
      storageKey="theme"
      themes={["light", "dark", "system"]}
    >
      {children}
    </NextThemeProvider>
  );
}