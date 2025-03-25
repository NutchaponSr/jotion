import Layout from "@/modules/ui/layouts/components/ui/layout";

import { 
  ArrowUpDownIcon,
  ListFilterIcon, 
  MoreHorizontalIcon, 
  SearchIcon, 
  ZapIcon
} from "lucide-react";
import { useToggle } from "react-use";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { IconVaraint } from "@/types/icon";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Hint } from "@/components/hint";
import { CircleCancelIcon } from "@/components/icons";

import { ViewOption } from "@/modules/ui/layouts/components/view-option";
import { ToolbarFilter } from "@/modules/ui/layouts/components/toolbar-filter";

import { ColumnProps } from "@/modules/ui/layouts/types/layouts";

import { useLayout } from "@/modules/ui/layouts/stores/use-layout";
import { useViewOption } from "@/modules/ui/layouts/stores/use-view-option";
import { useLayoutFilter } from "@/modules/ui/layouts/stores/use-layout-filter";

interface ToolbarProps<T extends object> {
  columns: ColumnProps<T>[];
  globalSearch: string;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

export const Toolbar = <T extends object>({
  columns,
  globalSearch,
  onChangeSearch,
  onClear
}: ToolbarProps<T>) => {
  const { 
    isOpenSort,
    isOpenFilter,
    addFilter,
    addSort,
    onOpenFilter,
    onCloseFilter,
    onCloseSort,
    onOpenSort,
  } = useLayoutFilter();
  const {
    isOpenToolbarFilter,
    onCloseToolbarFilter,
    onOpenToolbarFilter,
    onToggleToolbarFilter,
  } = useLayout();
  const { 
    isOpen: isOpenViewOption,
    onClose: onCloseViewOption,
    onToggle: toggleViewOption 
  } = useViewOption();

  const [isOpenSearch, toggleSearch] = useToggle(false);

  const [tooltipSortOpen ,setTooltipSortOpen] = useState(false);
  const [tooltipFilterOpen ,setTooltipFilterOpen] = useState(false);

  const isSomeSort = columns.some((column) => column.sort.isSort);
  const isSomeFilter = columns.some((column) => column.filter.isFilter && column.filter.searchQuery !== "");

  useEffect(() => {
    const noFilters = columns.every((column) => !column.filter.isFilter && !column.sort.isSort);
    if (noFilters) {
      onCloseToolbarFilter();
    }
  }, [columns, isOpenToolbarFilter, onCloseToolbarFilter]);

  const handleClearSearch = () => {
    onClear();
    toggleSearch(false);
  }

  return (
    <section className="min-h-10 px-24 sticky left-0 shrink-0 z-[86]">
      <div className="flex items-center h-10 w-full shadow-[0_1px_0_rgba(233,233,231)] dark:shadow-[0_1px_0_rgba(47,47,47)]">
        {/* TODO: Change year */}
        <div role="tablist" className="flex items-center h-full grow overflow-hidden" />
        <div className="flex items-center gap-0.5 z-[90]">
          <Layout.Popover
            showTooltip
            showAdvanced
            align="end"
            label="Filter"
            placeholder="Filter by..."
            isOpen={isOpenFilter}
            onClose={onCloseFilter}
            tooltipOpen={tooltipFilterOpen}
            data={columns.filter((column) => !column.filter.isFilter)} 
            onSelect={(id) => {
              onCloseFilter();
              addFilter(id);
              onOpenToolbarFilter();
            }}
          >
            <Button.Icon 
              onClick={() => {
                if (columns.some((column) => column.filter.isFilter)) onToggleToolbarFilter();
                else setTimeout(() => onOpenFilter(), 10);
                setTooltipFilterOpen(false);
              }} 
              onMouseEnter={() => setTooltipFilterOpen(true)}
              onMouseLeave={() => setTooltipFilterOpen(false)}
              className="size-7 hover:bg-popover-foreground"
            >
              <ListFilterIcon className={cn("size-4 text-icon", isSomeFilter && "text-marine")} />
            </Button.Icon>
          </Layout.Popover>
          <Layout.Popover
            showTooltip
            align="end"
            label="Sort"
            isOpen={isOpenSort}
            onClose={onCloseSort}
            data={columns.filter((column) => !column.sort.isSort)}
            tooltipOpen={tooltipSortOpen}
            onSelect={(id) => {
              onCloseSort();
              addSort(id);
              onOpenToolbarFilter();
            }}
            placeholder="Sort by..."
          >
            <Button.Icon 
              onClick={() => {
                if (columns.some((column) => column.sort.isSort)) onToggleToolbarFilter();
                else setTimeout(() => onOpenSort(), 10);
                setTooltipSortOpen(false);
              }}
              onMouseEnter={() => setTooltipSortOpen(true)}
              onMouseLeave={() => setTooltipSortOpen(false)}
              className="size-7 hover:bg-popover-foreground"
            >
              <ArrowUpDownIcon className={cn("size-4 text-icon", isSomeSort && "text-marine")} />
            </Button.Icon>
          </Layout.Popover>
          {/* TODO: Automation ex: send an email */}
          <Hint label="Automations" side="top">
            <Button.Icon className="size-7 hover:bg-popover-foreground">
              <ZapIcon className="size-4 text-icon" />
            </Button.Icon>
          </Hint>
          <div className="flex items-center relative">
            <Hint label="Search" side="top">
              <Button.Icon onClick={toggleSearch} className="size-7 hover:bg-popover-foreground">
                <SearchIcon className="size-4 text-icon" />
              </Button.Icon>
            </Hint>
            <motion.div
              animate={{ width: isOpenSearch ? 148 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden flex items-center w-full"
            >
              <div className="flex items-center justify-start">
                <Input 
                  autoFocus
                  area="none"
                  variant="none"
                  value={globalSearch}
                  onChange={onChangeSearch}
                  placeholder="Type to search..."
                  className="resize-none p-0 block w-32 border-none bg-none"
                />
                {globalSearch && (
                  <button onClick={handleClearSearch} className="inline-flex items-center justify-center shrink-0 grow-0 rounded-full size-5 hover:bg-[#37352f29]">
                    <CircleCancelIcon className="fill-icon size-4" variant={IconVaraint.SOLID} />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
          <Hint label="Edit and more..." side="top">
            <Button.Icon className={cn("size-7 hover:bg-popover-foreground", isOpenViewOption && "bg-popover-foreground")} onClick={toggleViewOption}>
              <MoreHorizontalIcon className="size-4 text-icon" />
            </Button.Icon>
          </Hint>
        </div>
      </div>
      {(isOpenToolbarFilter && columns.some((column) => column.filter.isFilter || column.sort.isSort)) && (
        <ToolbarFilter columns={columns} />
      )}
      <AnimatePresence>
        {isOpenViewOption && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 w-full h-full z-[80] pointer-events-auto"
              onClick={onCloseViewOption}
              aria-hidden="true"
            />
            <ViewOption />
          </>
        )}
      </AnimatePresence>
    </section>
  );
}