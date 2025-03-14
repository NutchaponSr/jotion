"use client";

import ErrorBoundary from "@/components/error-boundary";
import Trash from "@/modules/dashboard/components/ui/trash";

import React, { Suspense, useCallback, useEffect } from "react";

import { 
  ChevronRightIcon, 
  ChevronsLeftIcon, 
  CircleIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { useMedia, useToggle } from "react-use";
import { useRef, useState, ComponentRef } from "react";

import { cn } from "@/lib/utils";

import { 
  iconVaraint, 
  IconVaraint 
} from "@/types/icon";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

import { 
  AiChatIcon, 
  FolderLibraryIcon, 
  HashIcon, 
  HomeIcon, 
  InboxIcon, 
  SearchIcon, 
  Settings1Icon, 
} from "@/components/icons";
import { Accordion } from "@/components/accordion";

import { Navbar } from "@/modules/dashboard/components/navbar";
import { UserButton } from "@/modules/auth/components/user-button";
import { GroupSpace } from "@/modules/groups/components/group-space";

import { 
  BackgroundVariant, 
  SidebarActionProps, 
  SidebarItemProps, 
  sidebarItemVariant, 
  SidebarSubContentProps, 
  SidebarSubItemProps
} from "@/modules/dashboard/types/sidebar";

const Sidebar = () => {;
  const isMobile = useMedia("(max-width: 768px)");

  const [isDragging, setIsDragging] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isResizingRef = useRef(false);
  const navbarRef = useRef<ComponentRef<"div">>(null);
  const sidebarRef = useRef<ComponentRef<"aside">>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
    isResizingRef.current = true;
    
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
  };

  const handleMouseMove = (event: globalThis.MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 360) newWidth = 360;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100%-${newWidth}px)`);
    }
  }

  const handleMouseUp = () => {
    isResizingRef.current = false;
    setIsDragging(false);

    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mousemove", handleMouseMove);
  }

  const resetWidth = useCallback(() => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100%-240px)");
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");

      setTimeout(() => setIsResetting(false), 300);
    }
  }, [isMobile, setIsCollapsed]);

  const collapse = useCallback(() => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => setIsResetting(false), 300);
    }
  }, [setIsCollapsed])

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile, resetWidth, collapse]);

  return (
    <>
      <aside 
        ref={sidebarRef}
        className={cn(
          "h-full w-60 overflow-hidden select-none relative flex flex-col z-[100] group [&:has(>.resize-handle:hover)]:shadow-[inset_-2px_0_0_0_rgba(0,0,0,0.1)] dark:[&:has(>.resize-handle:hover)]:shadow-[inset_-2px_0_0_0_rgba(255,255,255,0.1)] bg-[#f7f7f5] dark:bg-[#202020]",
          isResetting && "transition-all ease-in-out duration-300",
          isDragging 
            ? "shadow-[inset_-2px_0_0_0_rgba(0,0,0,0.1)] dark:shadow-[inset_-2px_0_0_0_rgba(255,255,255,0.1)]"
            : "shadow-[inset_-1px_0_0_0_rgba(0,0,0,0.024)] dark:shadow-[inset_-1px_0_0_0_rgba(255,255,255,0.05)]",
          isMobile && "w-0"
        )}
      >
        <Button.Icon 
          onClick={collapse} 
          className={cn(
            "size-6 hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e] opacity-0 group-hover:opacity-100 transition-opacity absolute right-1 top-1 z-[110]",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeftIcon className="size-4 text-neutral-400 stroke-[1.75]" />
        </Button.Icon>
        <UserButton.Text />
        <div className="flex flex-col max-h-full justify-between relative">
          <Sidebar.Item icon={SearchIcon} label="Search" />
          <Sidebar.Item icon={AiChatIcon} label="Jotion AI" />
          <Sidebar.Item icon={HomeIcon} label="Overview" />
          <Sidebar.Item icon={InboxIcon} label="Inbox" />
          <Sidebar.Item icon={Settings1Icon} label="Settings" />
        </div>
        <ScrollArea className="pt-1.5 grow overflow-x-hidden overflow-y-auto">
          <div className="flex flex-col space-y-3 pb-5">
            <Sidebar.Content>
              <Sidebar.Label>
                Workspace
              </Sidebar.Label>
              <Sidebar.SubContent
                icon={FolderLibraryIcon} 
                label="Group"
                variant="pink"
              >
                <Suspense fallback={<Sidebar.Skeleton length={5} />}>
                  <ErrorBoundary>
                    <GroupSpace />
                  </ErrorBoundary>
                </Suspense>
              </Sidebar.SubContent>
            </Sidebar.Content>
            <Trash />
          </div>
        </ScrollArea>
        <div className="resize-handle absolute right-0 w-0 grow-0 z-[1] top-0 bottom-0">
          <div 
            onMouseDown={handleMouseDown}
            className={cn(
              "cursor-e-resize h-full w-3 -ml-1.5",
              isDragging ? "opacity-100" : "opacity-0 hover:opacity-100",
            )}
          />
        </div>
      </aside>
      <div 
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[80] w-[calc(100%-15rem)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full",
        )}
      >
        <div className="order-3 flex flex-col w-full overflow-hidden isolation-auto">
          <Navbar onResetWidth={resetWidth} isCollapsed={isCollapsed} />
        </div>
      </div>
    </>
  );
}

const SidebarItem = ({
  icon,
  label,
  emoji,
  variant,
  lastChild,
  isOpen = false,
  action,
  indent,
  onToggle,
  onClick
}: SidebarItemProps) => {
  return (
    <div 
      role="button" 
      onClick={onClick}
      className="flex items-center w-full text-sm min-h-8 p-1 transition hover:bg-[#00000008] dark:hover:bg-[#ffffff0e] space-x-2 cursor-pointer group/item"
      style={{ paddingLeft: `${indent}px` }}
    >
      <div className="flex items-center w-full">
        <div className="shrink-0 grow-0 rounded-sm flex justify-center items-center mr-2 ml-1 transition-all">
          <div className="flex items-center justify-center shrink-0 grow-0 size-6 relative">
            <div className="grid">
              <div className="row-start-1 col-start-1 row-auto col-auto">
                {!lastChild ? (
                  <div 
                    role="button"
                    className={cn(
                      sidebarItemVariant({ variant: variant as BackgroundVariant }),
                      !onToggle && "group-hover/item:opacity-100",
                    )}
                  >
                    {icon 
                      ? React.createElement(icon, { variant: IconVaraint.BULK, className: cn(iconVaraint({ variant }))})
                      : emoji
                        ? emoji
                        : <HashIcon className="size-5 text-muted" />
                    }
                  </div>
                ) : (
                  <CircleIcon className="fill-muted text-muted size-1.5" />
                )}
                {onToggle && <Sidebar.SubTrigger onToggle={onToggle} isOpen={isOpen} />}
              </div>
            </div>
          </div>
        </div>
        <p className="flex-auto whitespace-nowrap overflow-hidden text-start text-ellipsis text-sm font-medium text-primary-foreground dark:text-muted-foreground">
          {label}
        </p>
        {action && <Sidebar.Action>{action}</Sidebar.Action>}
      </div>
    </div>
  );
} 

const SidebarContent = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col w-full mb-3">
      {children}
    </div>
  );
}

const SidebarLabel = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <h2 className="flex items-center px-3 py-1.5 text-xs text-muted dark:text-muted-foreground">
      {children}
    </h2>
  );
}

const SidebarSubContent = ({ 
  children,
  ...props
}: SidebarSubContentProps) => {
  const [isOpen, toggle] = useToggle(false);

  return (
    <>
      <Sidebar.Item 
        {...props}
        onToggle={toggle}
        isOpen={isOpen}
      />
      <Accordion isOpen={isOpen}>
        {children}
      </Accordion>
    </>
  );
}

const SidebarSubTrigger = ({ 
  isOpen,
  onToggle
}: { 
  isOpen: boolean; 
  onToggle?: () => void;
}) => {
  return (
    <motion.div
      role="button"
      className="absolute inset-0 flex items-center justify-center rounded-sm hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e] opacity-0 transition-opacity duration-100 group-hover/item:opacity-100"
      onClick={(e) => {
        e.stopPropagation();
        onToggle?.();
      }}
    >
      <motion.div
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronRightIcon className="h-[18px] w-[18px] text-muted" />
      </motion.div>
    </motion.div>
  );
}

const SidebarAction = ({
  children
}: SidebarActionProps) => {
  return (
    <div className="flex items-center justify-center grow-0 shrink-0 h-full">
      <div className="group-hover/item:opacity-100 opacity-0 transition-opacity">
        {children}
      </div>
    </div>
  );
}

const SidebarSkeleton = ({ length = 1 }: { length: number }) => {
  return (
    Array.from({ length }, (_, index) => (
      <div key={index} className="flex items-center w-full text-sm min-h-8 py-1 px-2 transition hover:bg-[#00000008] dark:hover:bg-[#ffffff0e] space-x-2">
        <div className="flex items-center w-full space-x-2">
          <div className="shrink-0 grow-0 rounded-sm flex justify-center items-center transition-all">
            <div className="flex items-center justify-center shrink-0 grow-0 size-6 relative">
              <Skeleton className="size-6 rounded-sm" />
            </div>
          </div>
          <Skeleton className="h-2.5 w-full rounded-full" />
        </div>
      </div>
    ))
  );
}

const SidebarSubItem = ({
  children,
  indent
}: SidebarSubItemProps) => {
  return (
    <div 
      role="button" 
      className="flex items-center w-full min-h-8 p-1 transition hover:bg-[#00000008] dark:hover:bg-[#ffffff0e] space-x-2 cursor-pointer"
      style={{ paddingLeft: `${indent}px` }}
    >
      {children}
    </div>
  );
}

Sidebar.Action = SidebarAction;
Sidebar.Item = SidebarItem;
Sidebar.Content = SidebarContent;
Sidebar.Label = SidebarLabel;
Sidebar.SubContent = SidebarSubContent;
Sidebar.SubTrigger = SidebarSubTrigger;
Sidebar.Skeleton = SidebarSkeleton;
Sidebar.SubItem = SidebarSubItem;

export default Sidebar