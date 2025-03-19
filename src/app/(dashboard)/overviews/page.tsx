import { Workspace } from "@/components/workspace";
import { WelcomeMessage } from "@/components/welcome-message";
import { ShowcaseCalendar } from "@/components/showcase-calendar";

const OverviewPage = () => {
  return (
    <main className="grow-0 shrink flex flex-col max-h-full h-full w-full transition-all">
      <div className="w-full grid grid-cols-[minmax(56px,1fr)_minmax(auto,900px)_minmax(56px,1fr)] pb-40 gap-6">
        <WelcomeMessage />
        <Workspace />
        <ShowcaseCalendar />
      </div>
    </main>
  );
}

export default OverviewPage;