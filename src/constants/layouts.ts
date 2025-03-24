
import { 
  CalendarDaysIcon,
  Columns3Icon,
  LayoutGridIcon,
  ListIcon,
  LucideIcon, 
  MaximizeIcon, 
  MinimizeIcon, 
  PanelRightIcon, 
  Table2Icon 
} from "lucide-react";

import { LayoutType, PageView, PageViewProps } from "@/modules/ui/layouts/types/layouts";

export const layouts: Record<LayoutType, { icon: LucideIcon, label: string }> = {
  "table": { icon: Table2Icon, label: "Table" },
  "board": { icon: Columns3Icon , label: "Board" },
  "calendar": { icon: CalendarDaysIcon, label: "Calendar" },
  "list": { icon: ListIcon, label: "List" },
  "gallery": { icon: LayoutGridIcon, label: "Gallery" },
} 

export const pageViews: Record<PageView, PageViewProps> = {
  "side": {
    icon: PanelRightIcon,
    label: "Side peek",
    description: "Open pages on the sides. Keeps the view behind interactive.",
    default: true,
  },
  "center": {
    icon: MinimizeIcon,
    label: "Center peek",
    description: "Open pages in a focused, centered modal.",
  },
  "full": {
    icon: MaximizeIcon,
    label: "Full page",
    description: "Open pages in full page.",
  },
}