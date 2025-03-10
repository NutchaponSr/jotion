"use client";

import Image from "next/image";

import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { useRef } from "react";
import { Circle } from "./circle";
import { GitBranchIcon, SquareDashedKanbanIcon } from "lucide-react";
import Link from "next/link";


export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLButtonElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="flex flex-col items-stretch justify-between gap-10 w-full h-[300px]">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref} className="absolute left-1/4">
            <Image src="/excel.svg" alt="Excel" width={24} height={24} />
          </Circle>
          <Link href="/sign-in" className="absolute left-1/2 -translate-x-1/2 z-10">
            <button ref={div2Ref} className="inline-flex h-11 items-center justify-center gap-4 px-4 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-full overflow-hidden shadow-[0px_8px_16px_-4px_#0000003d,0px_4px_8px_-2px_#0000003d,0px_2px_4px_-1px_#0000003d,0px_0px_0px_1px_#37352f,inset_0px_0px_0px_1px_#ffffff14,inset_0px_1px_0px_#ffffff33] border-none transition duration-300">
              <span className="text-neutral-100 font-medium tracking-wide [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] text-lg">
                Jotion
              </span>
            </button>
          </Link>
          <Circle ref={div3Ref} className="absolute right-1/4">
            <Image src="/google-forms.svg" alt="Form" width={24} height={24} />
          </Circle>
          <Circle ref={div4Ref} className="absolute right-1/3 bottom-20">
            <GitBranchIcon className="size-5 text-sky-500 stroke-[1.75]" />
          </Circle>
          <Circle ref={div5Ref} className="absolute left-1/3 bottom-20">
            <SquareDashedKanbanIcon className="size-5 text-amber-500 stroke-[1.75]" />
          </Circle>
        </div>
      </div>
 
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        duration={3}
        />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div3Ref}
        duration={3}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div5Ref}
        duration={3}
        reverse
      />
    </div>
  );
}