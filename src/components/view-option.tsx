import {
  useEffect,
  useRef,
  useState
} from "react";
import { motion } from "framer-motion";
import View from "@/modules/bloc/layouts/components/ui/view";
import { FilterIcon, LinkIcon, ListIcon, TableIcon } from "./icons";
import { ArrowUpDownIcon, TableRowsSplitIcon, ZapIcon } from "lucide-react";

export const ViewOption = () => {
  const [height, setHeight] = useState(window.innerHeight);
  
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (asideRef.current) {
        const rect = asideRef.current.getBoundingClientRect();
        setHeight(window.innerHeight - rect.top);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <motion.aside
      ref={asideRef}
      initial={{ x: 200, opacity: 1 }}
      animate={{ x: 0, opacity: 1 }}   
      exit={{ x: 100, opacity: 0 }}      
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ height: `${height}px` }}
      className="absolute top-10 -right-24 bg-background border-l border-border pr-24 z-[90]"
    >
      <div className="flex h-full shadow-[inset_0_1px_0_rgb(233,233,231)] dark:shadow-[inset_0_1px_0_rgb(47,47,47)]">
        <div className="flex flex-col min-w-[290px] max-w-[290px] h-full max-h-full">
          <View.Header />
          <div className="p-1 flex flex-col">
            <View.Item icon={TableIcon} label="Layout" description="Table" />
          </div>
          <div className="p-1 flex flex-col shadow-[0_-1px_0_rgba(55,53,47,0.094)] dark:shadow-[0_-1px_0_rgba(255,255,255,0.094)]">
            <View.Item icon={ListIcon} label="Properties" description="4 shown" />
            <View.Item icon={FilterIcon} label="Filter" description="3 filters" />
            <View.Item icon={ArrowUpDownIcon} label="Sort" description="None" />
            <View.Item icon={TableRowsSplitIcon} label="Group" description="None" />
            <View.Item icon={ZapIcon} label="Automations" description="None" />
          </div>
          <div className="p-1 flex flex-col shadow-[0_-1px_0_rgba(55,53,47,0.094)] dark:shadow-[0_-1px_0_rgba(255,255,255,0.094)]">
            <View.Item icon={LinkIcon} label="Copy link" />
          </div>
        </div>  
        <div className="w-24" />
      </div>
    </motion.aside>
  );
}
