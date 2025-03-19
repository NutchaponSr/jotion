import { 
  ArrowUpDownIcon,
  ListFilterIcon, 
  MoreHorizontalIcon, 
  SearchIcon, 
  ZapIcon
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const Toolbar = () => {
  return (
    <section className="min-h-10 px-24 sticky left-0 shrink-0 z-[86]">
      <div className="flex items-center h-10 w-full">
        {/* shadow-[0_1px_0_rgba(233,233,231)] dark:shadow-[0_1px_0_rgba(47,47,47)] */}
        {/* TODO: Change year */}
        <div role="tablist" className="flex items-center h-full grow overflow-hidden" />
        <div className="flex items-center gap-0.5">
          <Button.Icon className="size-7 hover:bg-popover-foreground">
            <ListFilterIcon className="size-4 text-[#9a9a97]" />
          </Button.Icon>
          <Button.Icon className="size-7 hover:bg-popover-foreground">
            <ArrowUpDownIcon className="size-4 text-[#9a9a97]" />
          </Button.Icon>
          <Button.Icon className="size-7 hover:bg-popover-foreground">
            <ZapIcon className="size-4 text-[#9a9a97]" />
          </Button.Icon>
          <Button.Icon className="size-7 hover:bg-popover-foreground">
            <SearchIcon className="size-4 text-[#9a9a97]" />
          </Button.Icon>
          <Button.Icon className="size-7 hover:bg-popover-foreground">
            <MoreHorizontalIcon className="size-4 text-[#9a9a97]" />
          </Button.Icon>
        </div>
      </div>
    </section>
  );
}