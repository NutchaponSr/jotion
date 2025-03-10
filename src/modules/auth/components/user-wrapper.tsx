
import { Mode } from "@/components/mode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

interface UserWrapperProps {
  children: React.ReactNode;

  align?: "center" | "start" | "end";
}

export const UserWrapper = ({ children, align }: UserWrapperProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="p-0 min-w-[240px]">
        <DropdownMenuLabel>
          Content
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Mode />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}