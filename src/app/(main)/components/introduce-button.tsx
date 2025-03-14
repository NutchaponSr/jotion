import Link from "next/link";

import { ChevronRightIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";

export const IntroduceButton = () => {
  return (
    <Link href="/docs" className="z-10 relative">
      <button className="transition-all duration-150 ease-in-out shadow-[0_0_0_1px_rgba(15,15,15,0.1),0_2px_4px_rgba(15,15,15,0.1)] dark:shadow-[0_0_0_1px_#787774] bg-[#fffefc] dark:bg-neutral-800 hover:bg-[#F8F8F6] dark:hover:bg-neutral-700 inline-flex justify-center items-center h-7 rounded-full text-xs px-3 space-x-2">
        <span>🎉</span>
        <Separator orientation="vertical" className="h-4 bg-[#0f0f0f1a] dark:bg-[#787774] rounded-full" />
        <span className="text-primary">Introducing Jotion</span>
        <ChevronRightIcon className="size-4 text-[#787774]" />
      </button>
    </Link>
  );
}