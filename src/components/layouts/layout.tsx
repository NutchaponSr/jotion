import { 
  LayoutBaseProps, 
  LayoutPopoverProps 
} from "@/types/layouts";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import { Table } from "@/components/table";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <section className="grow shrink-0 flex flex-col relative">
      <div className="h-full relative float-left min-w-full select-none lining-nums pb-[180px] px-24">
        {children}
      </div>
    </section>
  );
}

const LayoutPopover = <T extends object>({ 
  align,
  children,
  data,
  placeholder,
  showAdvanced,
  isOpen,
  onClose,
  onSelect
}: LayoutPopoverProps<T>) => {
  return (
    <Popover open={isOpen} onOpenChange={onClose}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent align={align} className="p-0 min-w-[290px]">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No Result</CommandEmpty>
            <CommandGroup>
              {data.map((item, index) => (
                <CommandItem 
                  key={index}
                  value={item.label}
                  onSelect={() => onSelect(item.id)}
                  className="gap-2 leading-[120%] w-full min-h-7 text-sm px-2 py-1"
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        {showAdvanced && (
          <div className="p-1 shadow-[0_-1px_0_rgba(55,53,47,0.09)] dark:shadow-[0_-1px_0_rgba(255,255,255,0.094)] mt-px">
            <Button variant="item" size="sm">
              <PlusIcon style={{ strokeWidth: 2 }} />
              Add advanced filter
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export const TableLayout = <T extends { id: string }>({ ...props }: LayoutBaseProps<T>) => {
  return (
    <Layout>
      <Table.Header {...props} ids={[]} allSelected={false} />
      <Table.Body {...props} />
      <Table.Footer />
    </Layout>
  );
}

Layout.Popover = LayoutPopover;
Layout.Table = TableLayout;

export default Layout;