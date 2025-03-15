import { Command as CommandPrimitive } from "cmdk";

import { cn } from "@/lib/utils";

const Search = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) => {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className
      )}
      {...props}
    />
  );
}

const SearchInput = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) => {
  return (
    <div data-slot="command-input-wrapper" className="flex items-center p-1">
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "max-w-full w-full whitespace-pre-wrap break-words grow text-sm py-1 px-2.5 rounded-sm shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] bg-[#f2f1ee99] focus-visible:outline-none text-[#37352f] placeholder:text-[#91918e] font-light dark:bg-[#ffffff0e] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.075)] dark:text-[#ffffffcf] focus-within:shadow-[inset_0_0_0_1px_rgba(35,131,226,0.57),0_0_0_2px_rgba(35,131,226,0.35)]",
          className
        )}
        {...props}
      />
    </div>
  );
}

const SearchEmpty = ({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) => {
  return (
    <CommandPrimitive.Empty className="py-1 flex">
      <CommandPrimitive.Empty className="mb-1.5 mt-0.5 flex items-center w-full py-1">
        <CommandPrimitive.Empty className="mx-3 min-w-0 flex-auto">
          <CommandPrimitive.Empty
            data-slot="command-empty"
            className="text-xs whitespace-nowrap text-ellipsis overflow-hidden text-[#787774]"
            {...props}
          />
        </CommandPrimitive.Empty>
      </CommandPrimitive.Empty>
    </CommandPrimitive.Empty>
  );
}

const SearchList = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) => {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      )}
      {...props}
    />
  );
}

const SearchGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) => {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className
      )}
      {...props}
    />
  );
}

const SearchItem = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) => {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-popover-foreground data-[selected=true]:text-primary [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1 h-7 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

Search.Empty = SearchEmpty;
Search.Group = SearchGroup;
Search.Input = SearchInput;
Search.Item = SearchItem;
Search.List = SearchList;

export default Search;