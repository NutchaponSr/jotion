import React from "react";

import { cn } from "@/lib/utils";

import { 
  IconVaraint, 
  iconVaraint 
} from "@/types/icon";
import { Workspace } from "@/types/workspace"

import { Button } from "@/components/ui/button";

import { InfoIcon } from "@/components/icons";

interface BannerProps {
  workspace: Workspace;
}

export const Banner = ({ workspace }: BannerProps) => {
  return (
    <section className="w-full flex flex-col items-center shrink-0 grow-0 sticky left-0 group">
      <div className="max-w-full w-full pl-24 transition">
        <div className="flex justify-self-start flex-wrap py-1 text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" className="gap-2 text-secondary hover:text-secondary">
            <InfoIcon className="size-4 fill-secondary" variant={IconVaraint.SOLID} />
            Hide description
          </Button>
        </div>
        <div className="pr-24 mb-2 w-full">
          <div className="flex items-start gap-1.5">
            <div className="flex items-center justify-center shrink-0">
              {React.createElement(workspace.icon, {
                className: cn(iconVaraint({ variant: workspace.variant }), "size-9"),
                variant: IconVaraint.BULK
              })}
            </div>
            <h1 className="text-3xl text-primary font-bold flex items-center whitespace-pre-wrap">
              {workspace.label}
            </h1>
          </div>
          <p className="max-w-full w-full whitespace-pre-wrap text-primary font-semibold text-sm p-1"> 
            {workspace.description}
          </p>
        </div>
      </div>
    </section>
  );
} 