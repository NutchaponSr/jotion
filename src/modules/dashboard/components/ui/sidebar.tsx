"use client";

import { AiChatIcon, HomeIcon, SearchIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserButton } from "@/modules/auth/components/user-button";
import { iconVaraint, IconVaraint } from "@/types/icon";
import { ChevronsLeftIcon } from "lucide-react";
import { SidebarItemProps } from "../../types/sidebar";
import React from "react";

const Sidebar = () => {
  return (
    <aside className="h-full w-60 overflow-hidden select-none relative group flex flex-col z-[100] bg-[#f7f7f5] shadow-[inset_-1px_0_0_0_rgba(0,0,0,0.024)]">
      <Button.Icon className="size-6 hover:bg-[#00000008] opacity-0 group-hover:opacity-100 transition-opacity absolute right-1 top-1 z-[110]">
        <ChevronsLeftIcon className="size-4 text-neutral-400 stroke-[1.75]" />
      </Button.Icon>
      <div className="text-zinc-700 flex flex-col max-h-full justify-between overflow-hidden relative">
        <UserButton.Text />
        <Sidebar.Item icon={SearchIcon} label="Search" />
        <Sidebar.Item icon={AiChatIcon} label="Jotion AI" />
        <Sidebar.Item icon={HomeIcon} label="Home" />
      </div>
    </aside>
  );
}

const SidebarItem = ({
  icon,
  label,
  action,
  variant
}: SidebarItemProps) => {
  return (
    <div role="button" className="flex items-center w-full text-sm min-h-7 h-[30px] py-1 px-2 transition hover:bg-[#00000008] space-x-2 cursor-pointer group/item">
      <div className="flex items-center justify-center shrink-0 grow-0 size-5 relative">
        <div className="grid">
          <div 
            role="button"
            className={cn(
              "absolute inset-0 flex items-center justify-center rounded-sm transition-opacity duration-100 group-hover/workspace:opacity-0 text-lg",
            )}
          >
            {React.createElement(icon, { variant: IconVaraint.BULK, className: cn(iconVaraint({ variant })) })}
          </div>
        </div>
      </div>
      <p className="flex-auto whitespace-nowrap overflow-hidden text-ellipsis text-sm">
        {label}
      </p>
    </div>
  );
}

Sidebar.Item = SidebarItem;

export default Sidebar