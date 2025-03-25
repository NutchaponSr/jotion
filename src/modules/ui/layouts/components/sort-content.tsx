import Layout from "./ui/layout";

import { 
  ChevronDownIcon, 
  GripVerticalIcon, 
  XIcon 
} from "lucide-react";
import { useRef } from "react";
import { Reorder } from "framer-motion";

import { 
  ColumnProps, 
  SortOrder, 
  sorts 
} from "@/modules/ui/layouts/types/layouts";

import { useLayoutFilter } from "@/modules/ui/layouts/stores/use-layout-filter";

import { useSearch } from "@/hooks/use-searchs";

import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuEmpty,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { PlusIcon, TrashIcon } from "@/components/icons";

interface SortContentProps<T extends object> {
  columns: ColumnProps<T>[];  
}

export const SortContent = <T extends object>({ columns }: SortContentProps<T>) => {
  const { 
    addSort, 
    onSortBy,
    removeSort,
    removeSortAll,
    sortReorder,
    onChangeSort
  } = useLayoutFilter();

  const containerRef = useRef<HTMLDivElement>(null);

  const {
    filteredItems,
    searchQuery,
    setSearchQuery
  } = useSearch(columns, ["label"]);

  return (
    <>
      <div ref={containerRef} className="my-2">
        <Reorder.Group
          axis="y"
          values={columns.filter((column) => column.sort.isSort)}
          onReorder={sortReorder}
        >
          <div className="flex flex-col gap-1.5">
          {columns
            .filter((column) => column.sort.isSort)
            .sort((a, b) => a.sort.order - b.sort.order)
            .map((column) => (
              <Reorder.Item 
                key={String(column.id)} 
                value={column} 
                dragElastic={0} 
                dragConstraints={containerRef}
                className="flex items-center min-h-8 text-sm gap-2 mx-2"
              >
                <div className="flex items-center justify-center size-7 shrink-0 cursor-grab">
                  <GripVerticalIcon className="size-4 text-icon" />
                </div>
                <div className="flex-auto">
                  <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="md" variant="outline">
                          <column.icon className="size-4 text-icon" />
                          {column.label}
                          <ChevronDownIcon className="size-4 text-icon" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-60 flex flex-col gap-1">
                        <DropdownMenuLabel className="p-0">
                          <Input
                            area="sm"
                            variant="search"
                            value={searchQuery}
                            placeholder="Search for a property..."
                            onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </DropdownMenuLabel>
                        <div className="flex flex-col">
                          {filteredItems.length ?
                            filteredItems
                              .filter((column) => !column.sort.isSort)
                              .map(({ id, label }) => (
                                <DropdownMenuItem key={label} onClick={() => onChangeSort(column.id, id)} className="min-h-[30px]">
                                  {label}
                                </DropdownMenuItem>
                          )) : (
                            <DropdownMenuEmpty>
                              No results
                            </DropdownMenuEmpty>
                          )}  
                        </div>
                      </DropdownMenuContent> 
                    </DropdownMenu>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="md" variant="outline">
                          {sorts[column.sort.sortBy]}
                          <ChevronDownIcon className="size-4 text-icon" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-40">
                        {Object.entries(sorts).map(([key, sort], index) => (
                          <DropdownMenuItem key={index} onClick={() => onSortBy(column.id, key as SortOrder)}>
                            {sort}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="ml-auto shrink-0">
                  <Button.Icon onClick={() => removeSort(column.id)} className="size-6 hover:bg-popover-foreground">
                    <XIcon className="size-4 text-icon" />
                  </Button.Icon>
                </div>
              </Reorder.Item>
            ))
          }
        </div>
      </Reorder.Group>
      </div>
      <div className="flex flex-col items-center">
        <Layout.DropDown
          align="start"
          placeholder="Sort by..."
          data={columns.filter((column) => !column.sort.isSort)}
          onClick={(id) => {
            addSort(id);
          }}
        >
          <Button variant="item"  size="item" >
            <PlusIcon className="size-4 text-secondary-foreground" />
            Add sort
          </Button>
        </Layout.DropDown>
        <Button onClick={removeSortAll} variant="item" size="item" className="hover:text-destructive group">
          <TrashIcon className="size-4 group-hover:text-destructive text-secondary-foreground transition-colors" />
          Delete sort
        </Button>
      </div>
    </>
  );
}