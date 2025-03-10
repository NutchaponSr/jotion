import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center shrink-0 rounded-full bg-background shadow-[0_0_20px_-12px_rgba(0,0,0,0.8),0_0_0_1px_rgba(15,15,15,0.1),0_2px_4px_rgba(15,15,15,0.1)] dark:shadow-[0px_8px_16px_-4px_#0000003d,0px_4px_8px_-2px_#0000003d,0px_2px_4px_-1px_#0000003d,0px_0px_0px_1px_#37352f,inset_0px_0px_0px_1px_#ffffff14,inset_0px_1px_0px_#ffffff33] dark:bg-neutral-800",
        className,
      )}
    >
      {children}
    </div>
  );
});
 
Circle.displayName = "Circle";