import { 
  ComputerIcon, 
  LucideIcon,
  MoonIcon, 
  SunIcon 
} from "lucide-react";

import { ThemeType } from "@/stores/use-settings";

export const themes: { value: ThemeType, icon: LucideIcon }[] = [
  { value: "light", icon: SunIcon },
  { value: "dark", icon: MoonIcon },
  { value: "system", icon: ComputerIcon },
]