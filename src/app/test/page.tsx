import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const TestPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col w-[120px] gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="w-full" variant="primary">Primary</Button>
          </SheetTrigger>
          <SheetContent className="h-40">
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>

            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default TestPage;