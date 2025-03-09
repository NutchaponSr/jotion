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
        "z-10 flex size-12 items-center justify-center shrink-0 rounded-full bg-background shadow-[0_0_20px_-12px_rgba(0,0,0,0.8),0_0_0_1px_rgba(15,15,15,0.1),0_2px_4px_rgba(15,15,15,0.1)]",
        className,
      )}
    >
      {children}
    </div>
  );
});
 
Circle.displayName = "Circle";