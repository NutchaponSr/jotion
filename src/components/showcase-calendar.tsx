import { CalendarDaysIcon, MoreHorizontalIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";

export const ShowcaseCalendar = () => {
  return (
    <section className="col-start-2 group">
      <div className="w-full flex flex-row items-center justify-between h-12 px-2">
        <div className="flex items-center flex-shrink-0 gap-2">
          <div className="flex justify-center items-center shrink-0">
            <CalendarDaysIcon className="text-muted-foreground size-4" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">Upcoming events</span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button.Icon className="size-6 hover:bg-popover-foreground">
            <MoreHorizontalIcon className="size-4 text-[#a5a29a]" />
          </Button.Icon>
          <Button.Icon className="size-6 bg-sky-500 hover:bg-sky-600/90">
            <PlusIcon className="size-4 text-white" />
          </Button.Icon>
        </div>
      </div>
      <div className="p-4 relative flex flex-col rounded-xl bg-[#ffffffe6] dark:bg-[#202020e6] shadow-[0_12px_32px_rgba(0,0,0,0.02),0_0_0_1px_rgba(0,0,0,0.05)] min-h-[270px] max-h-[270px]">
        <div className="flex flex-col grow w-full h-full justify-center items-center px-[15%] gap-4">
          <CalendarDaysIcon className="size-12 text-secondary" style={{ strokeWidth: 1.25 }} />
          <p className="text-secondary text-sm text-center">No upcoming events in the next 3 days</p>
          <Button variant="ghost" size="sm" className="text-sky-500 hover:text-sky-500">
            <PlusIcon className="size-4" style={{ strokeWidth: 2 }} />
            New event
          </Button>
        </div>
      </div>
    </section>
  );
}