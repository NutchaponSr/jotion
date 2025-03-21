import { Button } from "@/components/ui/button";

const TestPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col w-[120px] gap-4">
        <Button className="w-full">Default</Button>
        <Button className="w-full" variant="primary">Primary</Button>
        <Button className="w-full" variant="ghost">Ghost</Button>
        <Button className="w-full" variant="item">Item</Button>
        <Button className="w-full" variant="filter">Filter</Button>
        <Button className="w-full" variant="filterActive">Filter Active</Button>
        <Button className="w-full" variant="outline">Outline</Button>
      </div>
    </div>
  );
}

export default TestPage;