
import { Group } from "@/modules/groups/api/use-get-group";
import { ColumnProps } from "@/types/table";

interface GroupCellsProps {
  cell: Group;
  column: ColumnProps<Group>;
  searchQuery: string;
}

export const GroupCells = ({ cell, column }: GroupCellsProps) => {
  const icon = cell["icon"];
  const value = cell[column.id];

  switch (column.id) {
    case "name": 
      return (
        <>
          {icon && (
            <div className="inline-flex items-center justify-center mr-1">
              <div className="flex items-center justify-center size-5 text-lg">
                {icon}
              </div>
            </div>
          )}
          <span className="leading-[1.5] whitespace-pre-wrap break-words font-medium bg-gradient-to-r from-neutral-400/20 to-neutral-400/20 bg-repeat-x bg-[position:0_100%] bg-[size:100%_1px] text-primary text-sm">
            {cell["name"]}
          </span>
        </>
      );
  }
}