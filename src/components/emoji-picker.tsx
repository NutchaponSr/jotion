import { 
  useEffect, 
  useMemo, 
  useRef, 
  useState 
} from "react";

import { cn, getEmojis } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { SearchIcon, ShuffleIcon, TrashIcon } from "./icons";

interface EmojiPickerProps {
  children: React.ReactNode;
  asChlid?: boolean;
  onChange: (icon: string) => void;
}

export const EmojiPicker = ({ 
  children,
  asChlid,
  onChange
}: EmojiPickerProps) => {
  const emojis = getEmojis();
  const flattedEmojis = emojis.flatMap(({ emojis }) => emojis);

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setcategory] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const containerRefs = useRef<Record<string, HTMLDivElement>>({});

  const filteredItems = useMemo(() => {
    if (!searchQuery) return emojis;

    return emojis
      .map((category) => ({
        ...category,
        emojis: category.emojis.filter((emoji) => emoji.name.toLowerCase().includes(searchQuery.toLowerCase()))
      }))
      .filter((category) => category.emojis.length > 0);
  }, [emojis, searchQuery]);



  return (
    <Popover>
      <PopoverTrigger asChild={asChlid}>
        {children}
      </PopoverTrigger>
      <PopoverContent 
        sideOffset={12} 
        alignOffset={17}
        align="start" 
        className="absolute -left-[22px] w-[343px] max-h-[70vh] h-[300px] p-2 flex flex-col"
      >
        <div className="flex items-center gap-1">
          <div className="relative w-full">
            <SearchIcon className="size-4 absolute top-1.5 left-2 text-primary" />
            <input 
              type="text"
              value={searchQuery}
              placeholder="filter..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#f2f1ee99] rounded-sm shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] relative flex w-full h-7 focus:outline-none px-2 py-1 pl-8 text-sm font-light text-primary placeholder:text-[#37352f80]"
            />
          </div>
          <Button.Icon className="size-7 shadow-[inset_0_0_0_1px_rgba(55,53,47,0.16)] hover:bg-[#37352f0f]">
            <ShuffleIcon className="size-4 text-[#A5A29A]" />
          </Button.Icon>
          <Button.Icon className="size-7 shadow-[inset_0_0_0_1px_rgba(55,53,47,0.16)] hover:bg-[#37352f0f]">
            <TrashIcon className="size-4 text-[#A5A29A]" />
          </Button.Icon>
        </div>
      </PopoverContent>
    </Popover>
  );
}