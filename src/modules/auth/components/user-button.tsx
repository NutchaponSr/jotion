import { auth } from "@/auth";

import { UserAvatar } from "./user-avatart";

import { UserWrapper } from "./user-wrapper";

export const UserButton = async () => {
  const session = await auth();

  // TODO: Skeleton
  if (
    !session
  ) {
    return null;
  }

  const name = session.user.name ?? "?";
  const imageUrl = session.user.image ?? "";


  return (
    <UserWrapper align="end">
      <UserAvatar name={name} imageUrl={imageUrl} />
    </UserWrapper>
  )
}

UserButton.ShowText = async function UserButtonShowText() {
  const session = await auth();

  // TODO: Skeleton
  if (
    !session
  ) {
    return null;
  }

  const name = session.user.name ?? "?";
  const imageUrl = session.user.image ?? "";

  return (
    <div className="flex">
      <UserAvatar name={name} imageUrl={imageUrl} />
      <div>
        <h1>{}</h1>
      </div>
    </div>
  );
}