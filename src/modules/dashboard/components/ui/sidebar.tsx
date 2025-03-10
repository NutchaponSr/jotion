"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/modules/auth/components/user-button";
import { ArrowLeftToLineIcon } from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="h-full w-60 overflow-hidden select-none relative group flex flex-col z-[100] bg-[#f7f7f5] shadow-[inset_-1px_0_0_0_rgba(0,0,0,0.024)]">
      {/* <Button.Icon className="size-7 hover:bg-[#00000008] opacity-0 group-hover:opacity-100 transition-opacity absolute">
        <ArrowLeftToLineIcon className="size-4 text-neutral-400" />
      </Button.Icon> */}
      <div className="text-zinc-600 flex flex-col max-h-full justify-between overflow-hidden relative">
        <UserButton.Text />
      </div>
    </aside>
  );
}