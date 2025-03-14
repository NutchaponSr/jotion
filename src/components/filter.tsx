import React from "react";

import { IconVaraint } from "@/types/icon";

import { Button } from "@/components/ui/button";

interface FilterProps {
  icon: React.ElementType;
  label: string;
}

const Filter = ({
  icon,
  label
}: FilterProps) => {
  return (
    <Button variant="filterActive" size="xs" className="w-fit gap-1">
      {React.createElement(icon, { className: "text-sky-500 size-3.5 stroke-[1.75]", variant: IconVaraint.STROKE })}
      <span className="max-w-[150px] text-xs font-normal whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </span>
    </Button>
  );
}

export default Filter;