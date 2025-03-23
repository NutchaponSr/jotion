import Filter from "@/components/filter";

import Sidebar from "@/modules/ui/dashboard/components/ui/sidebar";

import { 
  CornerUpLeftIcon, 
  FileIcon, 
  UserIcon 
} from "lucide-react";
import { useState } from "react";
import { useToggle } from "react-use";

import { useSearch } from "@/hooks/use-searchs";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { HashIcon, TrashIcon } from "@/components/icons";
import { ClearableInput } from "@/components/clearable-input";

import { Workspace, workspaces } from "@/modules/ui/dashboard/types/sidebar";

import { useGetTrashs } from "@/modules/ui/dashboard/api/use-get-trashs";

const Trash = () => {
  const [on, toggle] = useToggle(false);

  const { data: queryData, isLoading } = useGetTrashs(on);

  const [peoples, setPeoples] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const trashs = queryData?.data.populatedData || [];
  const updatedBy = queryData?.data.updatedPeoples || [];

  const {
    searchQuery,
    filteredItems,
    setSearchQuery,
    onClear
  } = useSearch(trashs, ["name"]);

  const finalTrashs = 
  peoples.length === 0 && categories.length === 0 
    ? filteredItems 
    : filteredItems.filter((item) => 
        (peoples.length === 0 || peoples.includes(item.updatedBy)) && 
        (categories.length === 0 || categories.includes(item.type))
      );

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
            value={searchQuery}
            placeholder="Search page in Trash"
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={onClear}
          />
        </div>
        <div className="flex flex-row items-center p-2 gap-1">
          <Filter.Command 
            icon={UserIcon} 
            label="Created by" 
            selectedValues={peoples}
            isSelected={peoples.length > 0}
            onSelectionChange={setPeoples}
            placeholder="Search people" 
            data={updatedBy}
          />
          <Filter.Command 
            icon={FileIcon} 
            label="In" 
            selectedValues={categories}
            isSelected={categories.length > 0}
            onSelectionChange={setCategories}
            placeholder="Search pages" 
            data={workspaces}
          />
        </div>
          {isLoading ? (
            <Trash.Skeleton />
          ) : (
            finalTrashs.length > 0 ? (
              <ScrollArea className="h-full grow overflow-x-hidden overflow-y-auto">
                <ul className="flex flex-col p-1">
                {finalTrashs.map((trash) => (
                  <Trash.Item 
                    key={trash.id}
                    id={trash.id}
                    name={trash.name}
                    icon={trash.icon}
                    description={trash.description}
                    variant={trash.type}
                  />
                ))}
              </ul> 
              </ScrollArea>
            ) : (
              <Trash.Empty />
            )
          )}
        <footer className="p-2 bg-[#2383e212] shadow-[0_-1px_0_rgba(55,53,47,0.09)] rounded-b-md px-2 flex items-center justify-between">
          <p className="text-xs text-[#37352fa6] dark:text-[#ffffff71]">
            Pages in Trash for over 30 days will be automatically deleted
          </p>
        </footer>
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
  name,
  icon,
  description
}: TrashItemProps) => {
  return (
    <li className="rounded-sm hover:bg-popover-foreground transition cursor-pointer group">
      <div className="flex items-center w-full min-h-7 h-7 text-sm py-1 px-2.5 gap-2">
        <div className="flex items-center justify-center gap-1">
          <div className="flex items-center justify-center size-5 shrink-0 text-base">
            {icon ? icon : <HashIcon className="size-[18px] text-[#91918e]" />}
          </div>
        </div>
        <div className="flex-auto">
          <div className="flex flex-row space-x-1 items-center">
            <h2 className="whitespace-nowrap overflow-hidden text-ellipsis text-[#37352f] dark:text-[#ffffffcf] text-sm">
              {name}
            </h2>
            <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis text-secondary mx-[0.5em]">—</span>
            <p className="whitespace-nowrap overflow-hidden text-ellipsis text-secondary dark:text-[#ffffff71] text-xs">
              {description}
            </p>
          </div>
        </div>
        <div className="ml-auto group-hover:opacity-100 opacity-0 transition-opacity">
          <div className="flex gap-1">
            <Button.Icon className="size-6 hover:bg-popover-foreground">
              <CornerUpLeftIcon className="size-4 text-[#a4a4a2] stroke-[1.7]" />
            </Button.Icon>
            <Button.Icon className="size-6 hover:bg-popover-foreground">
              <TrashIcon className="size-4 text-[#a4a4a2]" />
            </Button.Icon>
          </div>
        </div>
      </div>
    </li>
  );
}

const TrashSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 flex-auto">
      <TrashIcon className="text-[#c9c7c4] size-9" />
      <span className="text-sm font-semibold text-[#787774]">
        Trash pages appear here
      </span>
    </div>
  );
}

const TrashEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 flex-auto">
      <TrashIcon className="text-[#c9c7c4] size-9" />
      <span className="text-sm font-semibold text-[#787774]">
        No result
      </span>
    </div>
  );
}

Trash.Empty = TrashEmpty;
Trash.Item = TrashItem;
Trash.Skeleton = TrashSkeleton;

export default Trash;