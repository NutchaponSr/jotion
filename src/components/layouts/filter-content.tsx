import { LayoutFilterProps } from "@/types/layouts";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, MoreHorizontalIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ClearableInput } from "../clearable-input";
import { PlusIcon, TrashIcon } from "../icons";
import { useLayoutFilter } from "@/stores/use-layout-filter";

const Content = <T extends object>({ ...props }: LayoutFilterProps<T>) => {
  switch (props.column.type) {
    case "TEXT": 
      return <Content.Text {...props} />
  }
}

const Text = <T extends object>({ column }: LayoutFilterProps<T>) => {
  const { removeFilter } = useLayoutFilter();

  return (
    <div className="flex flex-col">
      <div className="flex items-center text-xs py-1 px-0.5 text-secondary gap-1">
        <span className="shrink whitespace-nowrap overflow-hidden text-ellipsis">
          {column.label}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="transition px-0.5 rounded flex items-center font-medium text-muted hover:bg-popover-foreground gap-0.5">
              contain
              <ChevronDownIcon className="size-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[190px]">
            <DropdownMenuItem>

            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="grow" />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button.Icon className="size-5 hover:bg-popover-foreground">
              <MoreHorizontalIcon className="size-4 text-muted" />
            </Button.Icon>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="w-60">
            <DropdownMenuItem className="group focus:text-destructive" onClick={() => removeFilter(column.id)}>
              <TrashIcon className="text-primary group-focus:text-destructive" />
              Delete filter
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PlusIcon className="text-primary" />
              Add to advanced filter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center min-h-7 px-0.5 pb-0.5">
        <ClearableInput 
          area="sm"
          variant="search"
          placeholder="Type a value..."
          onClear={() => {}}
        />
      </div>
    </div>
  );
}

Content.Text = Text;

export default Content;