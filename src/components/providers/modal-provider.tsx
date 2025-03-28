"use client";

import { useState } from "react";
import { useMount } from "react-use";

import { SearchCommand } from "@/modules/ui/dashboard/components/search-command";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useMount(() => setIsMounted(true));

  if (!isMounted) return null;

  return (
    <>
      <SearchCommand />
    </>
  );
}