import View from "@/modules/ui/layouts/components/ui/view";

import { 
  ArrowUpDownIcon, 
  Table2Icon, 
  TableRowsSplitIcon, 
  ZapIcon 
} from "lucide-react";

import { useSetting } from "@/stores/use-settings";

import { 
  FilterIcon, 
  LinkIcon, 
  ListIcon 
} from "@/components/icons";

import { ViewLayout } from "@/modules/ui/layouts/components/views/view-layout";
import { ViewProperty } from "@/modules/ui/layouts/components/views/view-property";

import { useViewOption } from "@/modules/ui/layouts/stores/use-view-option";
import { layouts } from "@/constants/layouts";

const ViewOptions = {
  Layout: ViewLayout,
  Property: ViewProperty,
}

export const ViewsHubs = () => {
  const { layout } = useSetting();
  const { type, onOpen, onClose } = useViewOption();

  switch (type) {
    case "layout":
      return <ViewOptions.Layout />;
    case "properties":
      return <ViewOptions.Property />;
    default: 
      return (
        <>
          <View.Header label="View options" onClose={onClose} />
          <View.Content>
            <View.Item 
              icon={layouts[layout].icon} 
              label="Layout" 
              description={layout} 
              onClick={() => onOpen("layout")} 
            />
          </View.Content>
          <View.Content line>
            <View.Item icon={ListIcon} label="Properties" description="4 shown" onClick={() => onOpen("properties")} />
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