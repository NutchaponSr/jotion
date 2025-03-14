"use client";

import { XIcon } from "lucide-react";

import { Input, InputProps } from "@/components/ui/input";

interface ClearableInputProps extends InputProps {
  onClear: () => void
}

export const ClearableInput = ({ onClear, value, ...props }: ClearableInputProps) => {
  return (
    <div className="relative w-full">
      <Input value={value} {...props} />
      {value && (
        <button className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center shrink-0 grow-0 rounded-full size-5 hover:bg-[#37352f29]" onClick={onClear}>
          <XIcon className="size-4" />
        </button>
      )}
    </div>
  );
}
