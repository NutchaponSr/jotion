"use client";

import { motion } from "framer-motion";

import { themes } from "@/constants/settings";

import { useSettings } from "@/stores/use-settings";
import { cn } from "@/lib/utils";

export const Mode = () => {
  const { theme, onTheme } = useSettings();

  return (
    <div className="flex flex-col items-center">
      <div className="flex bg-neutral-800 rounded-sm">
        {themes.map((item) => (
          <button key={item.value} className={cn(
            "relative px-4 py-2 mx-1 rounded-md font-medium focus:outline-none transition-colors",
            item.value === theme ? "text-white" : "text-gray-600 hover:text-gray-900",
          )}
            onClick={() => onTheme(item.value)}
          >
            {item.value === theme && (
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-0 bg-blue-500 rounded-md"
                initial={false}
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
            <span className="relative z-10">
              <item.icon />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}