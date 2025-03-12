"use client";

import Sidebar from "@/modules/dashboard/components/ui/sidebar";
import { useGetGroups } from "../api/use-get-groups";
import { CalendarDaysIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useCreateGroup } from "../api/use-create-group";

export const GroupSpace = () => {
  const { data } = useGetGroups();
  const { mutate } = useCreateGroup();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

  return (  
    years.map((year) => (
      <Sidebar.SubContent
        key={year}
        label={year}
        variant="default"
        indent={12}
        icon={CalendarDaysIcon}
        action={
          <Button.Icon 
            className="size-6 hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e]"
            onClick={() => {
              mutate({
                json: {
                  year,
                  name: "Untitled",
                },
              })
            }}
          >
            <PlusIcon className="size-4 text-[#91918e]" />
          </Button.Icon>
        }
      >
        {data
          .filter((item) => item.year === year)
          .map((item) => (
            <Sidebar.SubContent
              key={item.id}
              label={item.name}
              emoji={item.icon}
            >
              <Sidebar.Item label="Competency" />
            </Sidebar.SubContent>
        ))}
        
      </Sidebar.SubContent>
    ))
  );
}