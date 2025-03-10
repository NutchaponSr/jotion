import { iconVaraint } from "@/types/icon";
import { VariantProps } from "class-variance-authority";

export interface SidebarItemProps extends VariantProps<typeof iconVaraint> {
  action?: React.ReactNode;
  href?: string;
  icon: React.ElementType;
  label: string;
}