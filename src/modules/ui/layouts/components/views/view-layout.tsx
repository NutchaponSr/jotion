import View from "@/modules/ui/layouts/components/ui/view";

import { CircleHelpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { layouts, pageViews } from "@/constants/layouts";

import { useSetting } from "@/stores/use-settings";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Check1Icon } from "@/components/icons";

import { useViewOption } from "@/modules/ui/layouts/stores/use-view-option";

import { LayoutType, PageView } from "@/modules/ui/layouts/types/layouts";

export const ViewLayout = () => {
  const { 
    layout, 
    showIcon,
    pageView,
    showVerticalLine,
    onChangeViewPage,
    onChangeLayout,
    onSwitchIcon,
    onSwitchVerticalLine
  } = useSetting();
  const { ...props } = useViewOption();

  return (
    <>
      <View.Header label="Layout" {...props} />
      <ScrollArea className="flex flex-col h-full">
        <View.Content>
          <div className="w-full px-2 flex flex-wrap">
            {Object.entries(layouts).map(([key, { label, icon: Icon }]) => (
              <button 
                key={label}
                onClick={() => onChangeLayout(key as LayoutType)}
                className={cn(
                  "transition w-[calc(25%-12px)] flex flex-col items-center grow-0 shrink-0 text-xs rounded-sm m-1.5 p-1.5 ",
                  layout === key as LayoutType 
                    ? "cursor-default shadow-[0_0_0_2px_rgb(35,131,226)] text-marine font-semibold"
                    : "text-secondary-foreground hover:bg-popover-foreground shadow-[0_0_0_1px_rgba(55,53,47,0.09)]"
                )}
              >
                <Icon className={cn("size-5 my-1 text-secondary-foreground", layout === key as LayoutType && "text-marine")} />
                <span className="text-[11px]">{label}</span>
              </button>
            ))}
          </div>
        </View.Content>
        <View.Content>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <View.Item label="Open pages in" description="Side peek" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[250px]">
              {Object.entries(pageViews).map(([key, item]) => (
                <DropdownMenuItem 
                  key={key}
                  onClick={() => onChangeViewPage(key as PageView)}
                  className="flex items-center gap-2 w-full text-sm max-h-screen"
                >
                  <div className="flex items-center justify-center min-h-5 min-w-5 self-start">
                    <item.icon className="size-4 text-secondary-foreground" />
                  </div>
                  <div className="flex-auto flex flex-col gap-1">
                    <h3 className="whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</h3>
                    <p className="text-xs text-secondary-foreground break-words">
                      {item.description}
                    </p>
                    {item.default && (
                      <span className="text-xs text-marine font-medium">
                      Default for Table
                      </span>
                    )}
                  </div>
                  {pageView === key as PageView && (
                    <div className="ml-auto mr-3 min-w-0 shrink-0 w-5">
                      <Check1Icon className="w-full h-full" />
                    </div>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <View.Item 
            label="Show vertical lines" 
            action={<Switch checked={showVerticalLine} onCheckedChange={onSwitchVerticalLine} />} 
          />
          <View.Item 
            label="Show page icon" 
            action={<Switch checked={showIcon} onCheckedChange={onSwitchIcon} />} 
          />
        </View.Content>
        <View.Content>
          <View.Item icon={CircleHelpIcon} label="Learn about views" sub />
        </View.Content>
      </ScrollArea>
    </>
  );
}