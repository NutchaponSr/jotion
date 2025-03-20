import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4", {
  variants: {
    variant: {
      default: "bg-neutral-800 text-white ring-1 ring-neutral-800",
      primary: "bg-sky-500 hover:bg-sky-600/90 shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1),0_1px_2px_rgba(15,15,15,0.1)] text-white",
      ghost: "hover:bg-accent hover:text-primary text-primary",
      filter: "text-secondary-foreground hover:bg-popover-foreground dark:hover:bg-[#ffffff0e] border border-[#37352f29] dark:border-[#ffffff21]",
      filterActive: "bg-[#2383e208] text-sky-500 hover:bg-[#2383e212] border border-sky-400/40",
      item: "hover:bg-popover-foreground text-secondary-foreground w-full justify-start gap-2"
    },
    size: { 
      default: "h-9 has-[>svg]:px-3 rounded-md",
      sm: "h-7 rounded-sm gap-1.5 px-2 has-[>svg]:px-2.5",
      md: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
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
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button className={cn(
      "flex items-center justify-center shrink-0 rounded-sm transition",
      className,
    )} {...props}>
      {children}
    </button>
  );
}

export { Button, buttonVariants }
