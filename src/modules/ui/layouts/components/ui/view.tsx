import { ChevronRightIcon, XIcon } from "lucide-react";

import { ViewItemProps } from "../../types/view";
import { Button } from "@/components/ui/button";
import { createElement } from "react";
import { cn } from "@/lib/utils";

const View = {
  Header: () => {
    return (
      <div className="flex items-center px-4 py-3">
        <h2 className="grow font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis text-primary">
          View options
        </h2>
        <button className="flex items-center justify-center rounded-full bg-[#37352f0f] size-[18px] hover:bg-[#37352f29]">
          <XIcon className="size-3.5 text-[#787874]" />
        </button>
      </div>
    );
  },
  Item: ({
    label,
    icon,
    description
  }: ViewItemProps) => {
    return (
      <Button variant="item" size="md" className="gap-2.5">
        <div className="flex items-center">
          {createElement(icon, { className: "size-4 text-primary" })}
        </div>
        <span className="min-w-0 flex-auto whitespace-nowrap overflow-hidden text-ellipsis text-start text-primary">
          {label}
        </span>
        {description && (
          <div className="flex items-center gap-1.5">
            <span className="flex whitespace-nowrap overflow-hidden text-ellipsis text-xs capitalize text-muted dark:text-secondary">{description}</span>
            <ChevronRightIcon className="size-4 text-muted dark:text-secondary" />
          </div>
        )}
      </Button>
    );
  }
}

export default View;