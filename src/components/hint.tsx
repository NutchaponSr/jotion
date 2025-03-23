import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useState } from "react";

interface HintProps {
  children: React.ReactNode;
  label: string;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number
}

export const Hint = ({
  align,
  children,
  label,
  side,
  sideOffset
}: HintProps) => {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={150} open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent
          align={align}
          side={side}
          sideOffset={sideOffset}
          onMouseEnter={() => setOpen(false)}
          className="py-1 px-1.5"
        >
          <p className="text-xs font-medium">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}