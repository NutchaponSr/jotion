import { 
  ColumnProps, 
  FilterCondition, 
} from "@/modules/ui/layouts/types/layouts";

import { Group } from "@/modules/routes/groups/api/use-get-group";
import { CalendarDaysIcon, HashIcon, TextFontIcon } from "@/components/icons";

export const groupColumns: ColumnProps<Group>[] = [
  {
    id: "name",
    label: "Name",
    icon: TextFontIcon,
    isLock: true,
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
  // {
  //   id: "createdAt",
  //   label: "Created At",
  //   icon: CalendarDaysIcon,
  //   isLock: false,
  //   isHide: false,
  //   sort: {
  //     isSort: false,
  //     sortBy: "asc",
  //     order: 0,
  //   },
  //   filter: {
  //     isFilter: false,
  //     searchQuery: "",
  //     condition: FilterCondition.CONTAINS,
  //   },
  //   type: "NUMBER",
  //   calculation: null,
  //   order: 0,
  //   width: 256
  // }
] as const;