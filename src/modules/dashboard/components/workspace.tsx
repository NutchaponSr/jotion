import { CalendarDaysIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

import Sidebar from "@/modules/dashboard/components/ui/sidebar";
import { PlusIcon } from "lucide-react";

interface WorkspaceProps {
  headers: string[];
}

export const Workspace = ({ headers }: WorkspaceProps) => {
  return (
    <>
      {headers.map((header) => (
        <Sidebar.SubContent
          key={header}
          indent={12}
          icon={CalendarDaysIcon}
          variant="default"
          label={header}
          action={
            <Button.Icon className="hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e] size-6">
              <PlusIcon className="text-[#91918e] size-4" />
            </Button.Icon>
          }
        > 
          {/* TODO: Groups list */}
          <p />
        </Sidebar.SubContent>
      ))}
    </>
  );
}