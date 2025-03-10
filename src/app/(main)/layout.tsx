import { Footer } from "./components/footer";
import { Header } from "./components/header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#fffefc] dark:bg-background">
      <Header />
      <main className="mx-auto flex-1 overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;