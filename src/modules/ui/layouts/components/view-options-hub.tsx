import View from "@/modules/ui/layouts/components/ui/view";

import { 
  ArrowUpDownIcon, 
  TableRowsSplitIcon, 
  ZapIcon 
} from "lucide-react";

import { layouts } from "@/constants/layouts";

import { useSetting } from "@/stores/use-settings";

import { 
  FilterIcon, 
  LinkIcon, 
  ListIcon 
} from "@/components/icons";

import { ViewSort } from "@/modules/ui/layouts/components/views/view-sort";
import { ViewLayout } from "@/modules/ui/layouts/components/views/view-layout";
import { ViewFilter } from "@/modules/ui/layouts/components/views/view-filter";
import { ViewProperty } from "@/modules/ui/layouts/components/views/view-property";

import { useViewOption } from "@/modules/ui/layouts/stores/use-view-option";
import { useLayoutFilter } from "@/modules/ui/layouts/stores/use-layout-filter";

const ViewOptions = {
  Layout: ViewLayout,
  Property: ViewProperty,
  Filter: ViewFilter,
  Sort: ViewSort,
}

export const ViewsHubs = () => {
  const { layout } = useSetting();
  const { columns } = useLayoutFilter();
  const { type, onOpen, onClose } = useViewOption();

  const filterCount = columns.filter((column) => column.filter.isFilter).length;

  switch (type) {
    case "layout":
      return <ViewOptions.Layout />;
    case "properties":
      return <ViewOptions.Property />;
    case "filter": 
      return <ViewOptions.Filter />;
    case "sort":
      return <ViewOptions.Sort />;
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
            <View.Item 
              icon={ListIcon} 
              label="Properties" 
              description={`${columns.filter((column) => !column.isHide).length} shown`}
              onClick={() => onOpen("properties")} 
            />
            <View.Item 
              icon={FilterIcon} 
              label="Filter" 
              description={
                filterCount > 0 
                  ? `${filterCount} filter${filterCount > 1 ? "s" : ""}` 
                  : "None"
              }
              onClick={() => onOpen("filter")}
            />
            <View.Item icon={ArrowUpDownIcon} label="Sort" description="None"  onClick={() => onOpen("sort")} />
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