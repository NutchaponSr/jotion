import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";

interface AvatarUserProps {
  name: string;
  imageUrl?: string;
  className?: string;
}

export const UserAvatar = ({
  name,
  imageUrl,
  className,
}: AvatarUserProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={imageUrl} />
      <AvatarFallback className="text-white font-medium bg-gradient-to-b from-sky-500 from-10% to-sky-600 to-90%">
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}