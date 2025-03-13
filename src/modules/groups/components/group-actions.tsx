import { toast } from "sonner";
import { format } from "date-fns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

import { 
  ArrowUpRightIcon, 
  CopyIcon,
  LinkIcon, 
  NoteEditIcon, 
  SidebarRightIcon, 
  TrashIcon 
} from "@/components/icons";

import { Group } from "@/modules/groups/api/use-get-group";

interface GroupActionsProps {
  group: Group;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  onRename: () => void;
}

export const GroupActions = ({ 
  group,
  children, 
  side,
  onRename
}: GroupActionsProps) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/groups/${group.id}`;

  const onCopy = () => navigator.clipboard.writeText(baseUrl).then(() => toast.success("Copied link to cilpboard"));
  const onNewTab = () => {
    if (typeof window !== "undefined") {
      window.open(baseUrl, "_blank");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent side={side} sideOffset={8} className="min-w-60">
        <DropdownMenuItem onClick={onCopy}>
          <LinkIcon className="text-primary" />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CopyIcon className="text-primary" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRename}>
          <NoteEditIcon className="text-primary" /> 
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem className="group focus:text-destructive">
          <TrashIcon className="text-primary group-focus:text-destructive" />
          Move to Trash
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onNewTab}>
          <ArrowUpRightIcon className="text-primary" />
          Open in new tab
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SidebarRightIcon className="text-primary" />
          Open in side peek
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex flex-col gap-1 p-1">
          <p className="text-secondary dark:text-secondary text-xs font-normal">Last edited by {group.updatedBy}</p>
          <p className="text-secondary dark:text-secondary text-xs font-normal">{format(group.updatedAt, "MMM d, y, p")}</p>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}