import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4", {
  variants: {
    variant: {
      default: "bg-primary text-white hover:bg-primary/90 dark:bg-white dark:text-popover dark:hover:bg-white/90",
      primary: "bg-marine hover:bg-marine-foreground shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1),0_1px_2px_rgba(15,15,15,0.1)] text-white",
      ghost: "hover:bg-popover-foreground hover:text-primary text-primary",
      outline: "border border-primary/16 text-primary hover:bg-popover-foreground",
      filter: "text-secondary-foreground hover:bg-popover-foreground dark:hover:bg-white/5.5 border border-primary/16 dark:border-white/13",
      filterActive: "bg-marine/7 text-marine hover:bg-marine/14 border border-marine/35 [&_svg]:text-marine",
      item: "hover:bg-popover-foreground text-secondary-foreground w-full font-normal justify-start gap-2.5 px-2"
    },
    size: { 
      default: "h-9 has-[>svg]:px-3 rounded-md",
      sm: "h-7 rounded-sm gap-1.5 px-2 has-[>svg]:px-2.5",
      item: "h-[30px] rounded-sm px-2 has-[>svg]:px-2.5",
      md: "h-8 rounded-sm gap-1.5 px-2",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      xs: "h-6 rounded-sm gap-1 px-2 py-1",
      filter: "h-6 rounded-full gap-1 px-2 py-1",
      icon: "size-7",
      smIcon: "size-6", 
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  }
});

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

Button.Icon = function ButtonIcon({
  children,
  className,
  disabled,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button disabled={disabled} className={cn(
      "flex items-center justify-center shrink-0 rounded-sm transition",
      className,
    )} {...props}>
      {children}
    </button>
  );
}

export { Button, buttonVariants }
