import { VariantProps } from "class-variance-authority";

import { iconVaraint } from "@/types/icon";

export interface Workspace extends VariantProps<typeof iconVaraint> {
  href: string;
  label: string;
  description: string;
  icon: React.ElementType;
  className: string;
}