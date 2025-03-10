import { Logo } from "@/components/logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen h-screen bg-[#fffefc]">
      <header className="fixed z-[99] w-full flex items-center justify-center">
        <nav className="flex items-center justify-start w-full px-5 h-20 relative overflow-hidden gap-x-2">
          <Logo.Text />
        </nav>
      </header>
      <main className="flex flex-row w-full h-screen pt-20">
        <div className="px-[60px] w-full h-full mx-auto overflow-visible">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;