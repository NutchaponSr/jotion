import { useSetting } from "@/stores/use-settings";

import { highlightText } from "@/modules/ui/layouts/utils";

import { ColumnProps } from "@/modules/ui/layouts/types/layouts";

import { Group } from "@/modules/routes/groups/api/use-get-group";

interface GroupCellsProps {
  cell: Group;
  column: ColumnProps<Group>;
  searchQuery: string;
}

export const GroupCells = ({ cell, column, searchQuery }: GroupCellsProps) => {
  const { showIcon } = useSetting();

  const icon = cell["icon"];
  const value = cell[column.id];

  switch (column.id) {
    case "name": 
      return (
        <>
          {showIcon && icon && (
            <div className="inline-flex items-center justify-center mr-1">
              <div className="flex items-center justify-center size-5 text-lg">
                {icon}
              </div>
            </div>
          )}
          <span className="leading-[1.5] whitespace-pre-wrap break-words font-medium bg-gradient-to-r from-neutral-400/20 to-neutral-400/20 bg-repeat-x bg-[position:0_100%] bg-[size:100%_1px] text-primary text-sm">
            {highlightText(value as string, searchQuery)}
          </span>
        </>
      );
    case "year":
      return (
        <span className="leading-[1.5] whitespace-pre-wrap break-words font-medium text-primary text-sm">
          {highlightText(value as string, searchQuery)}
        </span>
      );
  }
}