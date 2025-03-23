import { 
  ColumnProps, 
  FilterCondition, 
} from "@/modules/ui/layouts/types/layouts";

import { Group } from "@/modules/routes/groups/api/use-get-group";
import { HashIcon, TextFontIcon } from "@/components/icons";

export const groupColumns: ColumnProps<Group>[] = [
  {
    id: "name",
    label: "Name",
    icon: TextFontIcon,
    isLock: false,
    isHide: false,
    sort: {
      isSort: false,
      sortBy: "asc",
      order: 0,
    },
    filter: {
      isFilter: false,
      searchQuery: "",
      condition: FilterCondition.CONTAINS,
    },
    type: "TEXT",
    calculation: null,
    order: 0,
    width: 256
  },
  {
    id: "year",
    label: "Year",
    icon: HashIcon,
    isLock: false,
    isHide: false,
    sort: {
      isSort: false,
      sortBy: "asc",
      order: 0,
    },
    filter: {
      isFilter: false,
      searchQuery: "",
      condition: FilterCondition.CONTAINS,
    },
    type: "NUMBER",
    calculation: null,
    order: 0,
    width: 169
  },
] as const;