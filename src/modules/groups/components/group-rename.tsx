import { useState } from "react";

import {
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { HashIcon } from "@/components/icons";
import { EmojiPicker } from "@/components/emoji-picker";

import { Group } from "@/modules/groups/api/use-get-group";

interface GroupRenameProps {
  group: Group;
  height: number;
  isOpen: boolean;
  onClose: () => void;
}

export const GroupRename = ({ 
  group,
  height,
  isOpen,
  onClose
}: GroupRenameProps) => {
  const [icon, setIcon] = useState(group.icon);
  const [name, setName] = useState(group.name);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    
  }

  return (
    <Popover open={isOpen} onOpenChange={onClose}>
      <PopoverContent className="fixed left-5 w-[343px] p-0" style={{ top: `${height + 35}px` }}>
        <form className="flex items-center p-1 gap-1" onSubmit={onSubmit}>
          <EmojiPicker asChlid onSelect={(icon) => setIcon(icon)}>
            <button className="transition flex justify-center items-center size-7 rounded-sm shadow-[inset_0_0_0_1px_rgba(55,53,47,0.16)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.075)] hover:bg-[#f2f1ee99] dark:hover:bg-popover-foreground shrink-0 outline-none">
              {icon ? icon : <HashIcon className="size-[18px] text-[#a5a29a]" />}
            </button>
          </EmojiPicker>
          <Input 
            value={name}
            area="sm"
            variant="secondary"
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant="primaryForeground" size="sm">
            Submit
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}