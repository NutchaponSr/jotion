"use client";

import Link from "next/link";

import { SquareDashedKanbanIcon } from "lucide-react";

import { Workspace as WorkspaceType } from "@/types/workspace";
import { workspaces } from "@/constants/workspace";
import { cn } from "@/lib/utils";
import React from "react";
import { IconVaraint, iconVaraint } from "@/types/icon";

export const Workspace = () => {
  return (
    <section className="col-start-2">
      <div className="w-full flex flex-row items-center h-12 ml-2">
        <div className="flex items-center flex-shrink-0 gap-2">
          <div className="flex justify-center items-center shrink-0">
            <SquareDashedKanbanIcon className="text-muted-foreground size-4" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">Workspace</span>
        </div>
      </div>
      <div className="relative min-h-36">
        <div className="overflow-x-auto overflow-hidden">
          <div className="grid grid-cols-3 gap-4 px-px pt-0.5 pb-6"> 
            {workspaces.map((workspace, index) => (
              <Workspace.Card key={index} workspace={workspace} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


interface WorkspaceCardProps {
  workspace: WorkspaceType;
}

const WorkspaceCard = ({ workspace }: WorkspaceCardProps) => {
  return (
    <div className="relative group">
      <Link href={workspace.href}
        className="flex flex-col transition cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-popover-foreground relative h-40 justify-stretch"
      >
        <div className="relative mb-4">
          <div className={cn("h-11", workspace.className)} />
          <div className="flex items-center justify-center rounded-e-sm absolute -bottom-3.5 left-4">
            {React.createElement(workspace.icon, ({ 
                className: cn(iconVaraint({ variant: workspace.variant, size: workspace.size })),
                variant: IconVaraint.SOLID
              })
            )}
          </div>
        </div>
        <div className="w-full min-h-20 py-2.5 px-4 relative flex flex-col justify-start gap-2 grow">
          <h2 className="whitespace-pre-wrap overflow-hidden text-ellipsis font-medium text-sm text-primary w-auto">
            {workspace.label}
          </h2>
          <p className="text-xs text-secondary line-clamp-2">
            {workspace.description}
          </p>
        </div>
      </Link>
      <div className="absolute rounded-2xl inset-0 shadow-[0_12px_32px_rgba(0,0,0,0.02),0_0_0_1px_rgba(0,0,0,0.05)] group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.03),_0_0_0_1px_rgba(0,0,0,0.086)] dark:shadow-[unset] dark:group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] pointer-events-none" />
    </div>
  );
}

Workspace.Card = WorkspaceCard;