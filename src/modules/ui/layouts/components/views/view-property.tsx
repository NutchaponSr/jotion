import View from "@/modules/ui/layouts/components/ui/view";

import { 
  ChevronRightIcon, 
  CircleHelpIcon, 
  GripVerticalIcon 
} from "lucide-react";
import { Reorder } from "framer-motion";

import { cn } from "@/lib/utils";

import { IconVaraint } from "@/types/icon";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

import { EyeIcon, EyeOffIcon } from "@/components/icons";

import { useViewOption } from "@/modules/ui/layouts/stores/use-view-option";
import { useLayoutFilter } from "@/modules/ui/layouts/stores/use-layout-filter";
import { useRef } from "react";

export const ViewProperty = () => {
  const { 
    columns, 
    hideAllColumns, 
    reorderColumn,
    showAllColumns,
    toggleColumnVisible
  } = useLayoutFilter();
  const { ...props } = useViewOption();

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <View.Header label="Properties" {...props} />
      <Command className="h-auto">
        <View.Content>
          <CommandInput autoFocus placeholder="Search for a property..." />
        </View.Content>
        <CommandList>
          <CommandEmpty>No results</CommandEmpty>
          <CommandGroup 
            heading="Shown in table" 
            button={
              <button className="text-marine text-xs transition hover:bg-[#ebf5fe] dark:hover:bg-marine/7 py-0.5 px-1.5 inline-flex items-center rounded-sm whitespace-nowrap font-medium" onClick={hideAllColumns}>
                Hide all
              </button>
            }
          >
            <div ref={containerRef}>
              <Reorder.Group
                axis="y"
                onReorder={reorderColumn}
                values={columns.filter((column) => !column.isHide)}
              >
                {columns
                  .filter((column) => !column.isHide)
                  .sort((a, b) => a.order - b.order)
                  .map((column) => (
                    <Reorder.Item
                      key={String(column.id)} 
                      value={column} 
                      dragElastic={0} 
                      dragConstraints={containerRef}
                    >
                      <CommandItem value={column.label} className="h-[30px] gap-2.5 px-2 rounded-sm text-primary data-[selected=true]:bg-[#37352f0f] dark:data-[selected=true]:bg-[#ffffff0e]">
                        <div className="flex items-center justify-center w-[18px] h-6 shrink-0 cursor-grab">
                          <GripVerticalIcon className="size-4 text-icon" />
                        </div>
                        <column.icon className="size-4 shrink-0 text-primary" />
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis capitalize text-sm">
                          {column.label}
                        </span>
                        <div className="ml-auto shrink-0 flex items-center gap-1">
                          <Button.Icon 
                            disabled={column.isLock} 
                            onClick={() => toggleColumnVisible(column.id)}
                            className={cn("size-6", column.isLock ? "opacity-50" : "hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e]")}
                          >
                            <EyeIcon className="size-4 fill-icon dark:fill-primary" variant={IconVaraint.SOLID} />
                          </Button.Icon>
                          <ChevronRightIcon className="size-4 text-icon shrink-0" />
                        </div>
                      </CommandItem>
                    </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
          </CommandGroup>
          {columns.filter((column) => column.isHide).length > 0 && (
            <CommandGroup 
              heading="Hidden in table"
              button={
                <button className="text-marine text-xs transition hover:bg-[#ebf5fe] dark:hover:bg-marine/7 py-0.5 px-1.5 inline-flex items-center rounded-sm whitespace-nowrap font-medium" onClick={showAllColumns}>
                  Show all
                </button>
              }
            >
              {columns.filter((column) => column.isHide).map((column) => (
                <CommandItem key={column.label} value={column.label} className="h-[30px] gap-2.5 px-2 rounded-sm text-primary data-[selected=true]:bg-[#37352f0f] dark:data-[selected=true]:bg-[#ffffff0e]">
                  <div className="flex items-center justify-center w-[18px] h-6 shrink-0 cursor-grab">
                    <GripVerticalIcon className="size-4 text-icon" />
                  </div>
                  <column.icon className="size-4 shrink-0 text-primary" />
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis capitalize text-sm">
                    {column.label}
                  </span>
                  <div className="ml-auto shrink-0 flex items-center gap-1">
                    <Button.Icon 
                      onClick={() => toggleColumnVisible(column.id)}
                      className="size-6 hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e]"
                    >
                      <EyeOffIcon className="size-4 fill-icon dark:fill-primary" variant={IconVaraint.SOLID} />
                    </Button.Icon>
                    <ChevronRightIcon className="size-4 text-icon shrink-0" />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
      <View.Content line>
        <View.Item sub label="Learn about properties" icon={CircleHelpIcon} />
      </View.Content>
    </>
  );
}