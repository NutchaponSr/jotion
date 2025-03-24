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

import { ViewOptions } from "@/modules/ui/layouts/components/ui/view-options";

import { useViewOption } from "@/modules/ui/layouts/stores/use-view-option";

export const ViewsHubs = () => {
  const { layout } = useSetting();
  const { type, onOpen, onClose } = useViewOption();

  switch (type) {
    case "layout":
      return <ViewOptions.Layout />;
    default: 
      return (
        <>
          <View.Header label="View options" onClick={onClose} />
          <View.Content>
            <View.Item 
              icon={Table2Icon} 
              label="Layout" 
              description={layout} 
              onClick={() => onOpen("layout")} 
            />
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