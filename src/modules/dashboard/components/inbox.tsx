import { 
  ArchiveIcon,
  ChevronsRightIcon, 
  ClockIcon, 
  InboxIcon, 
  ListFilterIcon, 
  MessageSquareDotIcon
} from "lucide-react";
import { motion } from "framer-motion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const Inbox = () => {
  return (
    <motion.section 
      role="region" 
      initial={{ x: -200, opacity: 1 }}
      animate={{ x: 0, opacity: 1 }}   
      exit={{ x: -100, opacity: 0 }}      
      transition={{ type: "spring", stiffness: 300, damping: 30,}}
      className="w-80 z-[90] bg-background shadow-[0_14px_28px_-6px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),0_0_0_1px_rgba(84,72,49,0.08)] dark:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.2),0_2px_4px_-1px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.094)] shrink-0 h-full group"
    >
      <div className="flex flex-col">
        <div className="px-4 py-2 flex justify-between items-center">
          <h2 className="flex items-center text-sm font-medium text-primary">Inbox</h2>
          <div className="flex items-center gap-1">
            <Button.Icon className="size-7 hover:bg-popover-foreground rounded group-hover:opacity-100 opacity-0">
              <ChevronsRightIcon className="size-4 text-[#a5a29a]" />
            </Button.Icon>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button.Icon className="size-7 hover:bg-popover-foreground rounded">
                  <ListFilterIcon className="size-4 text-[#a5a29a]" />
                </Button.Icon>
              </DropdownMenuTrigger>
              {/* TODO: Filter inbox functionality */}
              <DropdownMenuContent align="start" className="w-[250px]">
                <DropdownMenuLabel>Filter</DropdownMenuLabel>
                <DropdownMenuItem>
                  <InboxIcon />
                  Unread & read
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquareDotIcon />
                  Unread
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArchiveIcon />
                  Archived
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ClockIcon />
                  All Workspace updates
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="min-h-56 flex items-center justify-center text-sm text-primary">
          <div className="mt-[100px] flex items-center px-5 text-center flex-col h-full min-h-56 gap-2.5">
            <InboxIcon className="size-10 text-muted" style={{ strokeWidth: 1.25 }} />
            <div className="flex flex-col gap-1">
              <h2 className="text-muted font-medium">You&apos;re all caught up</h2>
              <p className="text-secondary text-xs">You&apos;ll be notified here for @mentions, page activity, and page invites</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}