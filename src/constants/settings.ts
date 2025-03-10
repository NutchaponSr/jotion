import { 
  SunIcon,
  MoonIcon,
  ComputerIcon
} from "@/components/icons";

export const themes: { value: string, icon: React.ElementType }[] = [
  { value: "light", icon: SunIcon },
  { value: "dark", icon: MoonIcon },
  { value: "system", icon: ComputerIcon },
]