"use client"

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md focus:outline-none",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input> & {
  variant?: "dialog";
}) {
  switch (variant) {
    case "dialog":
      return (
        <div data-slot="command-input-wrapper" className="flex w-full">
          <CommandPrimitive.Input 
            className={cn(
              "w-full whitespace-nowrap text-primary text-ellipsis focus-visible:outline-none placeholder:text-[#a4a4a2]",
              className,
            )}
            {...props}
          />
        </div>
      );
    default:
      return (
        <div data-slot="command-input-wrapper" className="flex items-center p-1">
          <CommandPrimitive.Input
            data-slot="command-input"
            className={cn(
              "max-w-full w-full whitespace-pre-wrap break-words grow text-sm py-1 px-2.5 rounded-sm shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] bg-[#f2f1ee99] focus-visible:outline-none text-[#37352f] placeholder:text-[#91918e] font-light dark:bg-[#ffffff0e] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.075)] dark:text-[#ffffffcf] focus-within:shadow-[inset_0_0_0_1px_rgba(35,131,226,0.57),0_0_0_2px_rgba(35,131,226,0.35)]",
              className
            )}
            {...props}
          />
        </div>
      );
  }
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "scroll-py-1 overflow-x-hidden overflow-y-auto w-full",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty> & {
  variant?: "dialog";
}) {
  switch (variant) {
    case "dialog":
      return (
        <CommandPrimitive.Empty data-slot="command-empty" className="flex flex-col h-full" {...props}>
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-sm font-medium text-primary-foreground">No results</div>
            <div className="text-sm text-secondary">Some result may be in your the Trash</div>
            <div className="text-sm text-sky-500 cursor-pointer">Search in trash</div>
          </div>
        </CommandPrimitive.Empty>
      );
    default: 
      return (
        <CommandPrimitive.Empty className={cn("py-1", className)} {...props}>
          <div className="mb-1.5 mt-0.5 flex items-center w-full py-1">
            <div className="mx-3 min-w-0 flex-auto">
              <div
                data-slot="command-empty"
                className="text-xs whitespace-nowrap text-ellipsis overflow-hidden text-[#787774] min-h-full"
              >
                {props.children}
              </div>
            </div>
          </div>
        </CommandPrimitive.Empty>
      );
  }
}

function CommandGroup({
  button,
  heading,
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group> & { button?: React.ReactNode }) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground overflow-hidden p-1 py-1.5",
        className
      )}
      {...props}
    >
      {button ? (
        <div className="flex items-center justify-between px-2 py-1.5">
          <h2 className="dark:text-muted-foreground text-[#373530a6] text-xs font-medium mt-0.5">{heading}</h2>
          {button && button}
        </div>
      ) : (
        <h2 className="dark:text-muted-foreground text-[#373530a6] text-xs font-medium py-1.5">{heading}</h2>
      )}
      {children}
    </CommandPrimitive.Group>
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-popover-foreground data-[selected=true]:text-primary [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center rounded-sm text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer focus:shadow-[inset_0_0_0_1px_rgba(14,165,233,0.57),0_0_0_2px_rgba(14,165,233,0.35)]",
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <div className="flex items-center grow-0 shrink-0">
      <span
        data-slot="command-shortcut"
        className={cn(
          "text-muted-foreground ml-auto self-start text-xs font-light basis-auto",
          className
        )}
        {...props}
      />
    </div>
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
