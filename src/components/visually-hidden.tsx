import { 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

export const VisuallyHidden = () => {
  return (
    <DialogHeader className="sr-only">
      <DialogTitle>{}</DialogTitle>
      <DialogDescription>{}</DialogDescription>
    </DialogHeader>
  );
}