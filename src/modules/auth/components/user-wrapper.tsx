"use client";

import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Mode } from "@/components/mode";
import { UserAvatar } from "./user-avatart";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { ClientSession } from "../hooks/use-current-user";

interface UserWrapperProps {
  children: React.ReactNode;
  align?: "center" | "start" | "end";
  alignOffset?: number;
  sideOffset?: number;
  user: ClientSession;
}

export const UserWrapper = ({ 
  children, 
  align, 
  alignOffset,
  sideOffset = 12,
  user 
}: UserWrapperProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} alignOffset={alignOffset} sideOffset={sideOffset} className="p-1 min-w-[240px]">
        <DropdownMenuLabel className="flex items-center space-x-2.5">
          <UserAvatar name={user.name ?? "?"} className="size-10 text-lg" />
          <div className="flex flex-col justify-start">
            <h3 className="text-sm text-stone-800 dark:text-stone-300 whitespace-nowrap text-ellipsis overflow-hidden">
              {user.name}
            </h3>
            <p className="text-xs text-stone-500 dark:text-[#9b9b9b] whitespace-nowrap text-ellipsis overflow-hidden font-normal">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-1 rounded-full" />
          <Mode.Tabs />
        <DropdownMenuSeparator className="mx-1 rounded-full" />
        <DropdownMenuItem>
          <SettingsIcon />
          Account settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOutIcon />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 