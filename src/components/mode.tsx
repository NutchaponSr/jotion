"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

import { themes } from "@/constants/settings";

import { IconVaraint } from "@/types/icon";

export const Mode = {
  Tabs: () => {
    const { theme, setTheme } = useTheme();
  
    return (
      <div className="flex flex-col items-center py-1">
        <div className="flex bg-stone-200/50 dark:bg-[#202020] rounded-sm mx-1">
          {themes.map(({ value, icon }) => (
            <button key={value} className={cn(
              "relative py-2 rounded-md font-medium focus:outline-none transition-colors flex items-center justify-center shrink-0 w-20",
            )}
              onClick={() => setTheme(value)}
            >
              {value === theme && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-sm shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1),0_2px_4px_rgba(15,15,15,0.1)] dark:shadow-[inset_0_0_0_1px_rgba(225,225,225,0.094),0_2px_4px_rgba(0,0,0,0.2)]"
                  initial={false}
                  transition={{ type: "keyframes", duration: 0.3 }}
                />
              )}
              <span className="relative z-10">
                {React.createElement(
                  icon, { 
                    className: "dark:fill-stone-300 size-6",
                    variant: IconVaraint.SOLID 
                  }
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }
}
