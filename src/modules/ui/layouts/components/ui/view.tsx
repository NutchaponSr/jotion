import {
  ArrowLeftIcon, 
  ChevronRightIcon, 
  XIcon 
} from "lucide-react";
import { createElement } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { 
  ViewHeaderProps, 
  ViewItemProps 
} from "@/modules/ui/layouts/types/view";

const View = {
  Content: ({ children, line }: { children: React.ReactNode; line?: boolean }) => {
    return (
      <div className={cn("p-1 flex flex-col", line && "shadow-[0_-1px_0_rgba(55,53,47,0.094)] dark:shadow-[0_-1px_0_rgba(255,255,255,0.094)]")}>
        {children}
      </div>
    );
  },
  Header: ({ label, onClose, onBack } :ViewHeaderProps) => {
    return (
      <div className="flex items-center gap-2 px-4 py-3 h-11">
        {onBack && (
          <Button.Icon className="size-6 hover:bg-popover-foreground" onClick={onBack}>
            <ArrowLeftIcon className="size-4 text-[#9a9a97]" />
          </Button.Icon>
        )}
        <h2 className="grow font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis text-primary">
          {label}
        </h2>
        <button onClick={onClose} className="flex items-center justify-center rounded-full bg-[#37352f0f] size-5 hover:bg-[#37352f29]">
          <XIcon className="size-3.5 text-[#787874]" />
        </button>
      </div>
    );
  },
  Item: ({
    action,
    label,
    icon,
    sub,
    description,
    onClick
  }: ViewItemProps) => {
    return (
      <div 
        role="menuitem" 
        onClick={onClick}
        className="gap-2.5 px-3 hover:bg-popover-foreground text-secondary-foreground w-full font-normal justify-start h-[30px] rounded-sm inline-flex items-center cursor-pointer text-sm" 
      >
        {icon && (
          <div className="flex items-center">
            {createElement(icon, { className: cn("size-4 text-primary", sub && "text-icon") })}
          </div>
        )}
        <span className={cn("min-w-0 flex-auto whitespace-nowrap overflow-hidden text-ellipsis text-start text-primary", sub && "text-icon")}>
          {label}
        </span>
        {description && (
          <div className="flex items-center gap-1.5">
            <span className="flex whitespace-nowrap overflow-hidden text-ellipsis text-xs capitalize text-muted dark:text-secondary">{description}</span>
            <ChevronRightIcon className="size-4 text-muted dark:text-secondary" />
          </div>
        )}
        {action}
      </div>
    );
  },
}

export default View;