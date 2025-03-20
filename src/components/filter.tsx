import React, { useState } from "react";

import { XIcon } from "lucide-react";

import { IconVaraint } from "@/types/icon";
import { FilterCommandProps } from "@/types/filter";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { Check1Icon } from "@/components/icons";

import { UserAvatar } from "@/modules/auth/components/user-avatar";

const Filter = {
  Command: ({ 
    data, 
    placeholder, 
    selectedValues,
    icon,
    label,
    isSelected,
    onSelectionChange,
  }: FilterCommandProps) => {
    const [search, setSearch] = useState("");

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={isSelected ? "filterActive" : "filter"} size="filter" className="w-fit gap-1">
            {React.createElement(icon, { className: "size-3.5", variant: IconVaraint.STROKE })}
            <span className="max-w-[150px] text-xs font-normal whitespace-nowrap overflow-hidden text-ellipsis">
              {label}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="max-w-[calc(100vw-24px)] min-w-[180px] w-[250px] h-full max-h-[40vh] shadow-[0_14px_28px_-6px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),0_0_0_1px_rgba(84,72,49,0.08)] flex flex-col p-0">
          <Command>
            <div className="relative">
              <CommandInput placeholder={placeholder} value={search} onValueChange={setSearch} />
              {search && (
                <Button.Icon
                  className="absolute right-2.5 top-2.5"
                  onClick={() => setSearch("")}
                >
                  <XIcon className="h-4 w-4 text-muted-foreground" />
                </Button.Icon>
              )}
            </div>
            <CommandList>
              <CommandEmpty>No result</CommandEmpty>
              <CommandGroup>
                {data.map((item, index) => {
                  const isSelected = selectedValues.includes(item.label);
                  return (
                    <CommandItem 
                      key={index}
                      onSelect={() => {
                        if (isSelected) {
                          onSelectionChange(selectedValues.filter(val => val !== item.label));
                        } else {
                          onSelectionChange([...selectedValues, item.label]);
                        }
                      }}
                      className="gap-2 leading-[120%] w-full min-h-7 text-sm px-2 py-1"
                    >
                      {item.icon ? (
                        <div className="flex items-center justify-center size-5 shrink-0 text-base">
                          <item.icon variant={IconVaraint.BULK} fill="#91918e" />
                        </div>
                      ) : (
                        <UserAvatar
                          name={item.label}
                          imageUrl={item.header ?? ""}
                          className="size-5 text-xs"
                        />
                      )}
                      <span className="flex-auto whitespace-nowrap text-ellipsis overflow-hidden">
                        {item.label}
                      </span>
                      {isSelected && <Check1Icon className="ml-2 h-4 w-4" />}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  } 
}


export default Filter;