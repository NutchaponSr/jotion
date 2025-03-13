import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  return (
    <header className="bg-transparent max-w-screen z-[70]">
      <div className="w-full h-11 relative left-0"> 
        <div className="flex justify-between items-center overflow-hidden h-11 px-3">
          <div className="grow shrink flex items-center space-x-2.5">
            {isCollapsed && (
              <Button.Icon onClick={onResetWidth} className="hover:bg-[#37352f0f] size-6">
                <MenuIcon className="size-4 text-primary" />
              </Button.Icon>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}