import { cn } from "@/lib/utils";

interface SelectMenuProps<T extends object> {
  selectedData: T[];
}

export const SelectMenu = <T extends object>({ selectedData }:  SelectMenuProps<T>) => {
  return (
    <nav className={cn(
      "sticky top-0 left-0 z-[999] invisible opacity-0 transition-opacity",
      selectedData.length && "visible opacity-100"
    )}>
     <ul className="absolute top-0 left-24 inline-flex justify-center items-center bg-white dark:bg-[#373737] h-8 rounded-sm shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08),0_0_0_1px_rgba(84,72,49,0.08)]">
      <button className="text-marine px-2.5 text-sm flex items-center whitespace-nowrap transition hover:bg-popover-foreground h-full rounded-sm">
        {selectedData.length} Selected
      </button>
      {/* TODO: Menues */}
     </ul>
    </nav>
  );
}