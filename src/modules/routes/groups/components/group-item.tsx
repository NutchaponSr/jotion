import Sidebar from "@/modules/ui/dashboard/components/ui/sidebar";

import { MoreHorizontalIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import { GroupRename } from "@/modules/routes/groups/components/group-rename";
import { GroupActions } from "@/modules/routes/groups/components/group-actions";

import { Group } from "@/modules/routes/groups/api/use-get-group";

interface GroupItemProps {
  group: Group
}

export const GroupItem = ({ group }: GroupItemProps) => {
  const [height, setHeight] = useState(0);
  const [isRename, setIsRename] = useState(false);

  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRename && itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setHeight(rect.top);
    }
  }, [isRename]);

  const onRename = () => setTimeout(() => { setIsRename(true) }, 200);

  return (
    <>
      <div ref={itemRef} />
      <Sidebar.SubContent
        label={group.name}
        emoji={group.icon}
        indent={20}
        action={
          <GroupActions side="right" group={group} onRename={onRename}>
            <Button.Icon className="size-6 hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e]" >
              <MoreHorizontalIcon className="size-4 text-muted" />
            </Button.Icon>
          </GroupActions>
        }
      >
        <Sidebar.Item lastChild label="Competency" indent={28} />
        <Sidebar.Item lastChild label="Employee" indent={28} />
      </Sidebar.SubContent>
      <GroupRename 
        group={group}
        height={height}
        isOpen={isRename}
        onClose={() => setIsRename(false)}
      />
    </>
  );
}