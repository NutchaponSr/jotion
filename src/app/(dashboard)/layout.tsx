import Sidebar from "@/modules/ui/dashboard/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-screen relative overflow-hidden">
      <div className="w-screen h-full relative flex">
        <Sidebar />
        <div className="flex-1 h-full overflow-y-auto bg-background dark:bg-[#191919]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;