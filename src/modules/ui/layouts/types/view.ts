export interface ViewItemProps {
  label: string;
  icon: React.ElementType;
  description?: string;
  onClick?: () => void;
}

export interface ViewHeaderProps { 
  label: string;
}