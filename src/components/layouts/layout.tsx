import { LayoutBaseProps } from "@/types/layouts";
import { Table } from "../table";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <section className="grow shrink-0 flex flex-col relative">
      <div className="h-full relative float-left min-w-full select-none lining-nums pb-[180px] px-24">
        {children}
      </div>
    </section>
  );
}

export const TableLayout = <T extends { id: string }>({ ...props }: LayoutBaseProps<T>) => {
  return (
    <Layout>
      <Table.Header columns={props.columns} ids={[]} allSelected={false} />
    </Layout>
  );
}

Layout.Table = TableLayout;

export default Layout;