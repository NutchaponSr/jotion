import { cva, VariantProps } from "class-variance-authority";

import { iconVaraint } from "@/types/icon";

export const sidebarItemVariant = cva(
  "flex items-center justify-center rounded-sm transition-opacity duration-100 group-hover/item:opacity-0 size-6", {
    variants: {
      variant: {
        default: "bg-[#37352f0f] dark:bg-[#ffffff0e]",
        pink: "bg-[#e188b345] dark:bg-[#4e2c3c]",
        orange: "bg-[#e07c3945] dark:bg-[#5c3b23]",
        sky: "bg-sky-100",
      }
    }
  }
);

export type BackgroundVariant = Exclude<VariantProps<typeof iconVaraint>["variant"],  null | undefined>

interface SidebarBaseProps {
  emoji?: string | null;
  icon?: React.ElementType;
  label: string;
  action?: React.ReactNode;
  indent?: number;
}

export interface SidebarActionProps {
  children: React.ReactNode;
}

export interface SidebarSubItemProps {
  children: React.ReactNode;
  indent?: number;
}

export interface SidebarItemProps extends VariantProps<typeof iconVaraint>, SidebarBaseProps {
  href?: string;
  isOpen?: boolean;
  lastChild?: boolean;
  onClick?: () => void;
  onToggle?: () => void;
}

export interface SidebarSubContentProps extends VariantProps<typeof iconVaraint>, SidebarBaseProps {
  children: React.ReactNode;
}

export enum Workspace {
  GROUP = "GROUP",
  COMPETENCY = "COMPETENCY",
}