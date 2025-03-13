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

  const [] = useState("");
  const [] = useState<string | null>(null);

  return (
    <Popover>
      <PopoverTrigger asChild={asChlid}>
        {children}
      </PopoverTrigger>
      <PopoverContent 
        sideOffset={12} 
        alignOffset={18}
        align="center" 
        className="w-[343px] p-0 shadow-none border-none" 
      >
        
      </PopoverContent>
    </Popover>
  );
}