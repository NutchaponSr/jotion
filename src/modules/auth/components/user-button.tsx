"use client";

import { UserAvatar } from "./user-avatart";

import { UserWrapper } from "./user-wrapper";

import { useCurrentUser } from "../hooks/use-current-user";

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
      <div role="button" className="flex items-center min-h-14 space-x-2.5 px-2.5 py-2 cursor-pointer hover:bg-[#00000008] dark:hover:bg-[#ffffff0e] transition">
        <UserAvatar 
          name={user.name!} 
          imageUrl={user.image}
          className="rounded-md" 
        />
        <div className="flex flex-col text-start">
          <h3 className="text-sm text-primary whitespace-nowrap text-ellipsis overflow-hidden font-medium">
            {user.name}
          </h3>
          <p className="text-xs text-primary-foreground dark:text-muted-foreground whitespace-nowrap text-ellipsis overflow-hidden font-normal">
            {user.email}
          </p>
        </div>
      </div>
    </UserWrapper>
  );
}