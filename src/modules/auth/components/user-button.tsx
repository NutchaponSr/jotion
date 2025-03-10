import { UserAvatar } from "./user-avatart";

import { UserWrapper } from "./user-wrapper";
import { getSession } from "../actions/get-session";

export const UserButton = async () => {
  const user = await getSession();

  if (!user) return null;

  return (
    <UserWrapper align="end" user={user}>
      <UserAvatar 
        name={user.name} 
        imageUrl={user.imageUrl}
        className="hover:opacity-85 transition-opacity outline-none size-9" 
      />
    </UserWrapper>
  )
}

UserButton.ShowText = async function UserButtonShowText() {
  const user = await getSession();

  // TODO: Skeleton
  if (!user) return null;

  return (
    <div className="flex">
      <UserAvatar name={user.name} imageUrl={user.imageUrl} />
      <div>
        <h1>{}</h1>
      </div>
    </div>
  );
}