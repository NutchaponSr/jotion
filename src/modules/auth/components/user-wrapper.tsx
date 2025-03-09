import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface UserWrapperProps {
  children: React.ReactNode;
  align: "center" | "start" | "end";
}

export const UserWrapper = ({ children, align }: UserWrapperProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="p-0 max-w-80">
        <DropdownMenuLabel>
          Content
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}