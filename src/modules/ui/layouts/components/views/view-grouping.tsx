import View from "@/modules/ui/layouts/components/ui/view";

import { useRef } from "react";
import { useToggle } from "react-use";
import { Reorder } from "framer-motion";
import { CircleHelpIcon, GripVerticalIcon } from "lucide-react";

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

import { EyeIcon, TrashIcon } from "@/components/icons";

import { useViewOption } from "@/modules/ui/layouts/stores/use-view-option";
import { useLayoutFilter } from "@/modules/ui/layouts/stores/use-layout-filter";

export const ViewGrouping = () => {
  const { ...props } = useViewOption();

  const { 
    columns,
    groupingColumn,
    groupingHeaders,
    addGrouping,
    removeGrouping,
    reorderGrouping,
    toggleGroupVisible,
    hideAllHeaders,
    showAllHeaders
  } = useLayoutFilter();

  const [newGroup, toggleGroup] = useToggle(false);

  const containerRef = useRef<HTMLDivElement>(null);

  if (!groupingColumn || newGroup) {
    return (
      <>
        <View.Header label="Group by" {...props} />
        <Command>
          <View.Content>
            <CommandInput autoFocus placeholder="Search for a property..." />
          </View.Content>
          <CommandList>
            <CommandEmpty>No results</CommandEmpty>
            <CommandGroup>
              {columns.map((column, index) => (
                <CommandItem 
                  key={index} 
                  onSelect={() => {
                    addGrouping(column);
                    toggleGroup(false);
                  }}
                  className="h-[30px] gap-2.5 px-3 rounded-sm text-primary data-[selected=true]:bg-popover-foreground"
                >
                  <column.icon className="size-4 shrink-0 text-primary" />
                  {column.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </>
    );
  }

  return (
    <>
      <View.Header label="Group" {...props} />
      <View.Content>
        <View.Item label="Group by" description={groupingColumn.label} onClick={toggleGroup} />
      </View.Content>
      <View.Content line>
        <div className="flex items-center justify-between px-2 my-1.5">
          <h3 className=" text-secondary-foreground text-xs font-medium">Visible groups</h3>
          <button onClick={hideAllHeaders} className="text-marine text-xs transition hover:bg-[#ebf5fe] dark:hover:bg-marine/7 py-0.5 px-1.5 inline-flex items-center rounded-sm whitespace-nowrap font-medium">
            Hide all
          </button>
        </div>
        <div ref={containerRef}>
          <Reorder.Group
            axis="y"
            onReorder={reorderGrouping}
            values={Object.entries(groupingHeaders).filter(([, value]) => value.isShow).map(([key]) => key)}
          >
            {Object.entries(groupingHeaders)
              .filter(([, value]) => value.isShow)
              .sort(([, a], [, b]) => a.order - b.order)
              .map(([key]) => (
                <Reorder.Item 
                  key={key} 
                  value={key}
                  dragConstraints={containerRef}
                  dragElastic={0}
                  className="flex items-center h-[30px] gap-2.5 px-2 rounded-sm text-primary"
                >
                  <div className="flex-auto">
                    <div className="flex items-center gap-2">
                      <Button.Icon className="size-6 cursor-grab">
                        <GripVerticalIcon className="size-4 text-icon" />
                      </Button.Icon>
                      <span className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
                        {key}
                      </span>
                    </div>
                  </div>
                  <Button.Icon onClick={() => toggleGroupVisible(key)} className="size-6 hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e]">
                    <EyeIcon className="size-4 fill-[#37352fd9] dark:fill-primary" variant={IconVaraint.SOLID} />
                  </Button.Icon>
                </Reorder.Item>
              ))
            }
          </Reorder.Group>
        </div>
      </View.Content>
      <View.Content line>
        <div className="flex items-center justify-between px-2 my-1.5">
          <h3 className=" text-secondary-foreground text-xs font-medium">Hidden groups</h3>
          <button onClick={showAllHeaders} className="text-marine text-xs transition hover:bg-[#ebf5fe] dark:hover:bg-marine/7 py-0.5 px-1.5 inline-flex items-center rounded-sm whitespace-nowrap font-medium">
            show all
          </button>
        </div>
        {Object.entries(groupingHeaders)
          .filter(([, value]) => !value.isShow)
          .map(([key]) => (
            <div 
              key={key} 
              className="flex items-center h-[30px] gap-2.5 px-2 rounded-sm text-primary"
            >
              <div className="flex-auto">
                <div className="flex items-center gap-2">
                  <Button.Icon className="size-6 cursor-not-allowed">
                    <GripVerticalIcon className="size-4 text-icon" />
                  </Button.Icon>
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
                    {key}
                  </span>
                </div>
              </div>
              <Button.Icon onClick={() => toggleGroupVisible(key)} className="size-6 hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e]">
                <EyeIcon className="size-4 fill-[#37352fd9] dark:fill-primary" variant={IconVaraint.SOLID} />
              </Button.Icon>
            </div>
          ))
        }
      </View.Content>
      <View.Content line>
        <button onClick={removeGrouping} className="gap-2.5 px-3 hover:bg-popover-foreground w-full font-normal justify-start h-[30px] rounded-sm inline-flex items-center cursor-pointer text-sm group">
          <div className="flex items-center">
            <TrashIcon className="size-4 shrink-0 text-icon group-hover:text-destructive" />
          </div>
          <span className="min-w-0 flex-auto whitespace-nowrap overflow-hidden text-ellipsis text-start group-hover:text-destructive text-icon">
            Remove grouping
          </span>
        </button>
        <View.Item sub icon={CircleHelpIcon} label="Learn about grouping" />
      </View.Content>
    </>
  );
}