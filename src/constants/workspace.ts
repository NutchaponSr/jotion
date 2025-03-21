import { Workspace } from "@/types/workspace";

import { 
  FolderLibraryIcon, 
  Notebook1Icon, 
  UsersIcon 
} from "@/components/icons";

export const group: Workspace = {
    label: "Group",
    href: "/groups",
    description: "Combining diverse skills to achieve shared goals.",
    icon: FolderLibraryIcon,
    className: "bg-[#f5e0e9] dark:bg-[#4e2c3c]",
    variant: "pink",
    size: "lg"
};

export const competency: Workspace = {
  label: "Competency",
  href: "/competencies",
  description: "Diverse skills and competencies to achieve shared goals.",
  icon: Notebook1Icon,
  className: "bg-[#fadec9] dark:bg-[#5c3b23]",
  variant: "orange",
  size: "lg"
}

export const employee: Workspace = {
  label: "Employee",
  href: "/employees",
  description: "Manage employees with diverse competencies to achieve goals.",
  icon: UsersIcon,
  className: "bg-[#d8e5ee] dark:bg-[#143a4e]",
  variant: "sky",
  size: "lg"
}

export const workspaces: Workspace[] = [group, competency, employee] as const;