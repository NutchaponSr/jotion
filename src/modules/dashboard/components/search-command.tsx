import { 
  ArrowUpDownIcon, 
  CornerDownLeftIcon, 
  SearchIcon
} from "lucide-react";

import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList, 
  CommandShortcut
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { AiChatIcon, CircleCancelIcon, FilterCircleIcon, HashIcon } from "@/components/icons";
import { VisuallyHidden } from "@/components/visually-hidden";

import { useSearchCommand } from "@/modules/dashboard/stores/use-search-command";
import { Search, useGetSearchs } from "../api/use-get-searchs";
import { useState } from "react";
import { cn, formatTimeElapsed } from "@/lib/utils";
import { IconVaraint } from "@/types/icon";

export const SearchCommand = () => {
  const { data: queryData } = useGetSearchs({});
  const { isOpen, onClose } = useSearchCommand();

  const searchs = queryData?.data || [];

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <VisuallyHidden />
      <DialogContent className="top-[22rem] min-h-[570px] max-h-[570px] h-[570px] min-w-[755px] p-0 gap-0 select-none flex flex-col">
        <Command>
          <div className="flex items-center px-4 w-full text-lg min-h-12 gap-3 shadow-[0_1px_0_rgba(55,53,47,0.09)] dark:shadow-[0_1px_0_rgba(255,255,255,0.094)]">
            <div className="flex items-center justify-center size-6 shrink-0">
              <SearchIcon className="size-5 text-[#a4a4a2]" />
            </div>
            <CommandInput 
              variant="dialog" 
              value={searchQuery}
              onValueChange={setSearchQuery}
              placeholder="Search or ask a question in Jotion" 
            />
            {searchQuery && <button className="transition inline-flex items-center justify-center shrink-0 rounded-full size-6 hover:bg-popover-foreground" onClick={() => setSearchQuery("")}>
              <CircleCancelIcon className="fill-[#a4a4a2] size-4" variant={IconVaraint.SOLID} />
            </button>}
            <Button.Icon className="size-7 hover:bg-popover-foreground">
              <FilterCircleIcon className="size-5 text-[#a4a4a2]" />
            </Button.Icon>
          </div>
          {/* TODO: Filter */}
          <div className="flex flex-row h-full overflow-hidden">
            <div className="flex grow shrink">
              <section className="pt-2 px-1 flex flex-1 w-full">
                <CommandList>
                  <CommandEmpty variant="dialog">No Result</CommandEmpty>
                  <CommandGroup heading="Actions">
                    <CommandItem className="flex items-center gap-2 leading-[120%] w-full min-h-9 text-sm p-2">
                      <div className="flex items-center justify-center min-w-6 min-h-6 self-center">
                        <div className="flex items-center justify-center size-6 shrink-0 text-lg">
                          <AiChatIcon className="size-5 text-[#a5a29a]" variant={IconVaraint.SOLID} />
                        </div>
                      </div>
                      <div className="flex-auto inline-flex items-center w-full">
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis text-sm text-primary font-medium">
                          Ask AI in Jotion
                        </span>
                      </div>
                    </CommandItem>
                  </CommandGroup>
                  {searchs.map((search) => (
                    <CommandGroup key={search.label} heading={search.label}>
                      {search.data.map((item, index) => (
                        <SearchItem 
                          key={index}
                          search={item}
                          index={index}
                        />
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </section>
              {/* TODO: Preview */}
              {searchQuery && (
                <aside className="w-[250px] text-primary border-l border-popover-foreground p-4 flex flex-col justify-between"> 
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Preview</h3>
                    <div className="rounded-md bg-popover-foreground p-3 h-[200px] flex items-center justify-center text-muted-foreground text-sm">
                      Select an item to preview
                    </div>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </Command>
        {!searchQuery && (
          <footer className="flex flex-row justify-between items-center py-1.5 px-4 shadow-[0_-1px_0_rgba(55,53,47,0.09)]  dark:shadow-[0_-1px_0_rgba(255,255,255,0.094)]">
            <ul className="whitespace-nowrap overflow-hidden text-ellipsis inline-flex items-center text-xs text-[#37352f80] dark:text-[#ffffff48] gap-5">
              <li className="flex gap-1.5 items-center h-max">
                <ArrowUpDownIcon className="size-3 text-[#9a9a97]" />
                Select
              </li>
              <li className="flex gap-1.5 items-center h-max">
                <CornerDownLeftIcon className="size-3 text-[#9a9a97]" />
                Open
              </li>
            </ul>
          </footer>
        )}
      </DialogContent>
    </Dialog>
  );
}

const SearchItem = ({
  index,
  search
}: {
  index: number;
  search: Search[0]["data"][0];
}) => {
  return (
    <CommandItem 
      value={search.name + index} 
      className="rounded-sm flex items-center gap-2 leading-[120%] w-full min-h-9 h-9 text-sm px-2 py-1.5"
    >
      <div className="flex items-center justify-center min-w-6 min-h-6 self-center">
        <div className={cn(
          "flex items-center justify-center size-6 shrink-0 text-lg",
          !search.icon && "border rounded-sm bg-background"
        )}>
          {search.icon ? search.icon : <HashIcon className="size-4 text-[#a5a29a]" />}
        </div>
      </div>
      <div className="flex-auto inline-flex items-center w-full">
        <h1 className="whitespace-nowrap overflow-hidden text-ellipsis text-sm text-primary font-medium">
          {search.name}
        </h1>
        <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis text-[#51493c52] mx-[0.5em]">—</span>
        <p className="text-[#51493c52] text-xs whitespace-nowrap overflow-hidden text-ellipsis">
          {search.description}
        </p>
      </div>
      <CommandShortcut>
        {formatTimeElapsed(search.createdAt)}
      </CommandShortcut>
    </CommandItem>
  );
}