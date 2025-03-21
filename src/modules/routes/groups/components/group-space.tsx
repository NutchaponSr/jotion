"use client";

import Sidebar from "@/modules/bloc/dashboard/components/ui/sidebar";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CalendarDaysIcon } from "@/components/icons";

import { GroupItem } from "@/modules/routes/groups/components/group-item";

import { useGetGroups } from "@/modules/routes/groups/api/use-get-groups";
import { useCreateGroup } from "@/modules/routes/groups/api/use-create-group";

export const GroupSpace = () => {
  const { data: groups } = useGetGroups();
  const { mutate } = useCreateGroup();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

  return (  
    <>
      {years.map((year) => (
        <Sidebar.SubContent
          key={year}
          label={year}
          variant="default"
          indent={12}
          icon={CalendarDaysIcon}
          action={
            <Button.Icon 
              className="size-6 hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e]"
              onClick={() => {mutate({ json: { year, name: "Untitled" }})}}
            >
              <PlusIcon className="size-4 text-muted" />
            </Button.Icon>
          }
        >
        {groups
          .filter((group) => group.year === year)
          .map((group, index) => (
            <GroupItem key={index} group={group} />
        ))}
        </Sidebar.SubContent>
      ))}
      <Sidebar.SubItem indent={20}>
        <span className="text-xs text-muted dark:text-muted-foreground">
          More detail...
        </span>
      </Sidebar.SubItem>
    </>
  );
}