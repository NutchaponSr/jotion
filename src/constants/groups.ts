import { 
  ColumnProps, 
  FilterCondition, 
  sorts 
} from "@/types/table";

import { Group } from "@/modules/groups/api/use-get-group";
import { HashIcon, TextFontIcon } from "@/components/icons";

export const groupColumns: ColumnProps<Group>[] = [
  {
    id: "name",
    label: "Name",
    icon: TextFontIcon,
    isLock: false,
    isHide: false,
    isSort: false,
    isSorted: false,
    isFilter: false,
    searchQuery: "",
    type: "TEXT",
    filterCondition: FilterCondition.CONTAINS,
    sortBy: sorts.asc,
    sortOrder: 0,
    calculation: null,
    order: 0,
    width: 256
  },
  // {
  //   id: "year",
  //   label: "Year",
  //   icon: HashIcon,
  //   isLock: false,
  //   isHide: false,
  //   isSorted: false,
  //   searchQuery: "",
  //   type: "NUMBER",
  //   filterCondition: FilterCondition.CONTAINS,
  //   sortBy: sorts.asc,
  //   sortOrder: 0,
  //   calculation: null,
  //   order: 0,
  //   width: 144
  // },
] as const;