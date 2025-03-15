import React from "react";
import Search from "@/components/search";

import { IconVaraint } from "@/types/icon";
import { FilterBaseProps, FilterCommandProps } from "@/types/filter";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { Check1Icon } from "@/components/icons";

import { UserAvatar } from "@/modules/auth/components/user-avatar";

const FilterButton = ({
  icon,
  label,
  isSelected
}: FilterBaseProps) => {
  return (
    <Button variant={isSelected ? "filterActive" : "filter"} size="xs" className="w-fit gap-1">
      {React.createElement(icon, { className: "size-3.5 stroke-[1.75]", variant: IconVaraint.STROKE })}
      <span className="max-w-[150px] text-xs font-normal whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </span>
    </Button>
  );
}

const Filter = {
  Command: ({ 
    data, 
    placeholder, 
    selectedValues,
    onSelectionChange,
    ...props 
  }: FilterCommandProps) => {
    return (
      <Popover>
        <PopoverTrigger>
          <FilterButton {...props} />
        </PopoverTrigger>
        <PopoverContent align="start" className="max-w-[calc(100vw-24px)] min-w-[180px] w-[250px] h-full max-h-[40vh] shadow-[0_14px_28px_-6px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),0_0_0_1px_rgba(84,72,49,0.08)] flex flex-col p-0">
          <Search>
            <Search.Input placeholder={placeholder} />
            <Search.List>
              <Search.Empty>No result</Search.Empty>
              <Search.Group>
                {data.map((item, index) => {
                  const isSelected = selectedValues.includes(item.label);
                  return (
                    <Search.Item 
                      key={index}
                      onSelect={() => {
                        if (isSelected) {
                          onSelectionChange(selectedValues.filter(val => val !== item.label));
                        } else {
                          onSelectionChange([...selectedValues, item.label]);
                        }
                      }}
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
                    </Search.Item>
                  );
                })}
              </Search.Group>
            </Search.List>
          </Search>
        </PopoverContent>
      </Popover>
    );
  } 
}


export default Filter;