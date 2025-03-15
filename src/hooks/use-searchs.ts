"use client";

import { useMemo, useState } from "react";

type SearchableItem = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const useSearch = <T extends SearchableItem>(items: T[], searchKey: (keyof T)[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchKey) return items;

    return items.filter((item) => 
      searchKey.some((key) => item[key].toString().toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [items, searchKey, searchQuery]);

  const onClear = () => setSearchQuery("");

  return {
    searchQuery,
    filteredItems,
    setSearchQuery,
    onClear
  };
}