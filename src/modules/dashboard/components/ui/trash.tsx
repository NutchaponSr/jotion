import Sidebar from "@/modules/dashboard/components/ui/sidebar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import { TrashIcon } from "@/components/icons";
import { ClearableInput } from "@/components/clearable-input";
import Filter from "@/components/filter";
import { FileIcon, UserIcon } from "lucide-react";
import { ScrollBar } from "@/components/ui/scroll-area";
import { useGetTrashs } from "../../api/use-get-trashs";
import { useToggle } from "react-use";
import { Suspense } from "react";
import { Workspace } from "../../types/sidebar";

const Trash = () => {
  const [on, toggle] = useToggle(false);

  const { data: queryData } = useGetTrashs(on);

  const trashs = queryData?.data.populatedData || [];

  return (
    <Popover>
      <PopoverTrigger>
        <Sidebar.Item icon={TrashIcon} label="Trash" onClick={toggle} />
      </PopoverTrigger>
      <PopoverContent align="start" side="right" className="min-w-[414px] h-[40vh] max-h-[70vh] p-0 flex flex-col">
        <div className="flex items-center w-full min-w-7 px-2 pt-2">
          <ClearableInput
            area="sm"
            variant="search"
            placeholder="Search page in Trash"
            onClear={() => {}}
          />
        </div>
        <div className="flex flex-row items-center p-2 gap-1">
          <Filter icon={UserIcon} label="Created by" />
          <Filter icon={FileIcon} label="In" />
        </div>
        <ScrollBar className="grow overflow-x-hidden overflow-y-auto custom-scrollbar">
          <Suspense fallback={<p>Loading...</p>}>
            {trashs.map((trash) => (
              <Trash.Item 
                key={trash.id}
                id={trash.id}
                name={trash.name}
                icon={trash.icon}
                description={trash.description}
                variant={trash.type}
              />
            ))}
          </Suspense>
        </ScrollBar>
      </PopoverContent>
    </Popover>
  );
} 

interface TrashItemProps {
  id: string;
  name: string;
  icon: string | null;
  description: string;
  variant: Workspace;
}

const TrashItem = ({
  name
}: TrashItemProps) => {
  return (
    <div className="text-primary">
      {name}
    </div>
  );
}

Trash.Item = TrashItem

export default Trash;