import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const baseStyles = [
  // Layout and typography
  "relative isolate items-center justify-center overflow-hidden whitespace-nowrap",
  "px-3 py-[0.1875rem] text-sm font-medium md:inline-flex",
  
  // Transitions
  "transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)]",
  
  // SVG handling
  "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
  
  // Pseudo-elements (common)
  "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)]",
  "after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:mix-blend-overlay",
  
  // Hover state
  "hover:before:opacity-100"
].join(" ");


const effectStyles = {
  shadow: "shadow-[inset_0_1px_hsla(0,0%,100%,.07),0_1px_3px_rgba(33,33,38,.2)]",
  gradients: {
    before: "before:bg-gradient-to-b before:from-white/20 before:opacity-50",
    after: "after:bg-gradient-to-b after:from-white/10"
  }
};

const variantEffects = [
  effectStyles.shadow,
  effectStyles.gradients.before,
  `${effectStyles.gradients.after} after:from-[36%] after:to-[64%]`
].join(" ");

const buttonVariants = cva(baseStyles, {
  variants: {
    variant: {
      default: `bg-neutral-800 text-white ring-1 ring-neutral-800 ${variantEffects}`,
      supper: `bg-violet-600 text-white ring-1 ring-violet-600 ${variantEffects}`,
      destructive: `bg-destructive text-white ring-1 ring-destructive ${variantEffects}`,
      primary: `bg-sky-500 text-white ring-1 ring-sky-500 ${variantEffects}`,
      warning: `bg-warning text-white ring-1 ring-warning ${variantEffects}`,
      ghost: "hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      default: "h-9 has-[>svg]:px-3 rounded-md",
      sm: "h-7 rounded-sm gap-1.5 px-2 has-[>svg]:px-2.5",
      md: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-7",
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

export { Button, buttonVariants }
