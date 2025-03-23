import Layout from "./layout";

import { useSetting } from "@/stores/use-settings"
import { LayoutBaseProps } from "@/types/layouts";

export const LayoutsHub = <T extends { id: string }>({ ...props }: LayoutBaseProps<T>) => {
  const { layout } = useSetting();

  switch (layout) {
    case "table":
      return <Layout.Table {...props} />
  }
}