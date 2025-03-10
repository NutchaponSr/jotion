"use client";

import { UserAvatar } from "./user-avatart";

import { UserWrapper } from "./user-wrapper";

import { useCurrentUser } from "../hooks/use-current-user";
import { ChevronsUpDownIcon } from "lucide-react";

export const UserButton = () => {
  const user = useCurrentUser();

  // TODO: Skeleton
  if (!user) return null;

  return (
    <UserWrapper align="end" user={user}>
      <UserAvatar 
        name={user.name!} 
        imageUrl={user.image}
        className="hover:opacity-85 transition-opacity outline-none size-9" 
      />
    </UserWrapper>
  );
}

UserButton.Text = function UserButtonText() {
  const user = useCurrentUser();

  // TODO: Skeleton
  if (!user) return null;

  return (
    <UserWrapper align="start" user={user} alignOffset={8} sideOffset={4}>
      <div role="button" className="flex items-center min-h-14 space-x-2.5 px-2.5 py-2 cursor-pointer hover:bg-[#00000008] transition">
        <UserAvatar 
          name={user.name!} 
          imageUrl={user.image}
          className="rounded-md" 
        />
        <div className="flex flex-col text-start">
          <h3 className="text-sm text-stone-800 dark:text-stone-300 whitespace-nowrap text-ellipsis overflow-hidden">
            {user.name}
          </h3>
          <p className="text-xs text-stone-500 dark:text-[#9b9b9b] whitespace-nowrap text-ellipsis overflow-hidden font-normal">
            {user.email}
          </p>
        </div>
        <div className="flex items-center justify-center w-full">
          <ChevronsUpDownIcon className="size-4" />
        </div>
      </div>
    </UserWrapper>
  );
}