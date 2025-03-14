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
import { useTrashGroup } from "../api/use-trash-group";
import { useDuplicateGroup } from "../api/use-duplicate-group";
import { useCallback } from "react";

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
  const { mutate: trash } = useTrashGroup();
  const { mutate: duplicate } = useDuplicateGroup();

  const baseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/groups/${group.id}`;

  const onCopy = () => navigator.clipboard.writeText(baseUrl).then(() => toast.success("Copied link to cilpboard"));
  const onNewTab = () => {
    if (typeof window !== "undefined") {
      window.open(baseUrl, "_blank");
    }
  };

  const onTrash = useCallback(() => {
    trash({ param: { id: group.id }});
  }, [group.id, trash]);

  const onDuplicate = useCallback(() => {
    duplicate({ param: { id: group.id }});
  }, [duplicate, group.id])

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
        <DropdownMenuItem onClick={onDuplicate}>
          <CopyIcon className="text-primary"  />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRename}>
          <NoteEditIcon className="text-primary" /> 
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem className="group focus:text-destructive" onClick={onTrash}>
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