"use client";

import { cn } from "@/lib/utils";

import { group } from "@/constants/workspace";

import { useLayout } from "@/stores/use-layout";

import { Banner } from "@/components/banner";

import { GroupContent } from "@/modules/routes/groups/components/group-content";

const GroupPage = () => {
  const { isOpenViewOption } = useLayout();

  return (
    <main className="grow-0 shrink flex flex-col bg-white dark:bg-[#191919] h-[calc(100vh-44px)] max-h-full relative w-full transform transition top-11">
      <div className={cn("flex flex-col grow relative overflow-auto", isOpenViewOption && "overflow-y-hidden")}>
        <Banner workspace={group} />
        <GroupContent />
      </div>
    </main>
  );
}

export default GroupPage;