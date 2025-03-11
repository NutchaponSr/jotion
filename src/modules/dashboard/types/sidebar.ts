import { cva, VariantProps } from "class-variance-authority";

import { iconVaraint } from "@/types/icon";

export const sidebarItemVariant = cva(
  "flex items-center justify-center rounded-sm transition-opacity duration-100 group-hover/item:opacity-0 size-6", {
    variants: {
      variant: {
        default: "bg-[#37352f0f]",
        pink: "bg-pink-100",
        orange: "bg-orange-100",
        sky: "bg-sky-100",
      }
    }
  }
);

export type BackgroundVariant = Exclude<VariantProps<typeof iconVaraint>["variant"],  null | undefined>

interface SidebarBaseProps {
  icon: React.ElementType;
  label: string;
}

export interface SidebarActionProps {
  children: React.ReactNode;
}

export interface SidebarItemProps extends VariantProps<typeof iconVaraint>, SidebarBaseProps {
  href?: string;
  isOpen?: boolean;
  onToggle?: () => void;
  action?: React.ReactNode;
  indent?: number;
}

export interface SidebarSubContentProps extends VariantProps<typeof iconVaraint>, SidebarBaseProps {
  children: React.ReactNode;
  action?: React.ReactNode;
  indent?: number;
}