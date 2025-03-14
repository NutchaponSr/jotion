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
import { Button } from "@/components/ui/button";

import { 
  SearchIcon, 
  ShuffleIcon, 
  TrashIcon 
} from "@/components/icons";
import { Input } from "./ui/input";
import { emojiCategories } from "@/constants/emojis";
import { ScrollArea } from "./ui/scroll-area";

interface EmojiPickerProps {
  children: React.ReactNode;
  asChlid?: boolean;
  onSelect: (icon: string) => void;
}

export const EmojiPicker = ({ 
  children,
  asChlid,
  onSelect
}: EmojiPickerProps) => {
  const emojis = getEmojis();
  const flattedEmojis = emojis.flatMap(({ emojis }) => emojis);

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filteredItems = useMemo(() => {
    if (!searchQuery) return emojis;

    return emojis
      .map((category) => ({
        ...category,
        emojis: category.emojis.filter((emoji) => 
          emoji.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
      .filter((category) => category.emojis.length > 0);
  }, [searchQuery, emojis]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const scrollContainerRect = scrollContainerRef.current.getBoundingClientRect();
    const middlePoint = scrollContainerRect.top + scrollContainerRect.height / 4;

    let currentCategory: string | null = null;

    Object.entries(categoryRefs.current).forEach(([category, ref]) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();

        if (rect.top <= middlePoint && rect.bottom >= middlePoint) {
          currentCategory = category;
        }
      }
    });

    setCategory(currentCategory);
  }

  const scrollToCategory = (category: string) => {
    categoryRefs.current[category]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCategory(category); 
  };

  const onRandom = () => {
    const randonIndex = Math.floor(Math.random() * flattedEmojis.length);
    onSelect(flattedEmojis[randonIndex].emoji);
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild={asChlid}>
        {children}
      </PopoverTrigger>
      <PopoverContent sideOffset={12} className="min-w-[343px] max-h-[70vh] h-[300px] p-0 absolute -left-1 flex flex-col" align="start">
        <div className="flex items-center gap-1 p-2">
          <div className="relative w-full">
            <SearchIcon className="w-4 absolute top-0.5 left-2 text-primary dark:text-muted" />
            <Input 
              value={searchQuery}
              placeholder="filter..."
              variant="secondary"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relative flex w-full h-7 focus:outline-none pr-2 py-1 pl-8 text-sm font-light text-primary placeholder:text-[#37352f80] dark:placeholder:text-muted"
            />
          </div>
          <Button.Icon className="size-7 shadow-[inset_0_0_0_1px_rgba(55,53,47,0.16)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.075)] hover:bg-[#f2f1ee99] dark:hover:bg-popover-foreground" onClick={onRandom}>
            <ShuffleIcon className="size-[18px] text-[#A5A29A]" />
          </Button.Icon>
          <Button.Icon className="size-7 shadow-[inset_0_0_0_1px_rgba(55,53,47,0.16)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.075)] hover:bg-[#f2f1ee99] dark:hover:bg-popover-foreground">
            <TrashIcon className="size-[18px] text-[#A5A29A]" />
          </Button.Icon>
        </div>
        <ScrollArea 
          ref={scrollContainerRef} 
          onScroll={() => {}}
          className="overflow-y-scroll custom-scrollbar h-full"
        >
          
        </ScrollArea>
        <div className="border-t dark:border-popover-foreground flex px-2 py-1 justify-between">
          {emojiCategories.map((emojiCat, index) => (
            <Button.Icon
              key={index}
              onClick={() => scrollToCategory(emojiCat.hint)}
              className={cn(
                "size-7 hover:bg-popover-foreground",
                // currentCategory === emojiCat.hint && "bg-[#37352f0f]",
              )}
            >
              <emojiCat.icon className="h-4 w-4 text-gray-500 dark:text-[#91918e]" />
            </Button.Icon>
        ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}