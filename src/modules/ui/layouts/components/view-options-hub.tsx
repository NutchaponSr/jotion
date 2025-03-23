import View from "./ui/view";

import { useViewOption } from "../stores/use-view-option"

import { FilterIcon, LinkIcon, ListIcon, TableIcon } from "@/components/icons";
import { ArrowUpDownIcon, TableRowsSplitIcon, ZapIcon } from "lucide-react";
import { ViewOptions } from "./ui/view-options";

export const ViewsHubs = () => {
  const { type, onOpen } = useViewOption();

  switch (type) {
    case "layout":
      return <ViewOptions.Layout />;
    default: 
      return (
        <>
          <View.Header label="View options" />
          <View.Content>
            <View.Item icon={TableIcon} label="Layout" description="Table" onClick={() => onOpen("layout")} />
          </View.Content>
          <View.Content line>
            <View.Item icon={ListIcon} label="Properties" description="4 shown" />
            <View.Item icon={FilterIcon} label="Filter" description="3 filters" />
            <View.Item icon={ArrowUpDownIcon} label="Sort" description="None" />
            <View.Item icon={TableRowsSplitIcon} label="Group" description="None" />
            <View.Item icon={ZapIcon} label="Automations" description="None" />
          </View.Content>
          <View.Content line>
            <View.Item icon={LinkIcon} label="Copy link" />
          </View.Content>
        </>
      );
  }
}