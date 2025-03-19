import { group } from "@/constants/workspace";

import { Banner } from "@/components/banner";
import { GroupContent } from "@/modules/groups/components/group-content";

const GroupPage = async () => {
  return (
    <main className="grow-0 shrink flex flex-col bg-white dark:bg-[#191919] h-[calc(100vh-44px)] max-h-full relative w-full transform transition top-11">
      <div className="flex flex-col grow relative overflow-auto">
        <Banner workspace={group} />
        <GroupContent />
      </div>
    </main>
  );
}

export default GroupPage;