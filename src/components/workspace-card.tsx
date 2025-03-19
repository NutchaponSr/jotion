import Link from "next/link";

import { Workspace } from "@/types/workspace";

interface WorkspaceCardProps {
  workspace: Workspace;
}

export const WorkspaceCard = ({ workspace }: WorkspaceCardProps) => {
  return (
    <Link href={workspace.href}
      className="flex flex-col transition cursor-pointer overflow-hidden rounded-2xl bg-background relative h-36 justify-stretch z-10"
    >
      {workspace.label}
    </Link>
  );
}