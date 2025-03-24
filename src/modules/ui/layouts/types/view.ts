import { JSX } from "react";

export interface ViewItemProps {
  label: string;
  icon?: React.ElementType;
  description?: string;
  sub?: boolean;
  action?: JSX.Element;
  onClick?: () => void;
}

export interface ViewHeaderProps { 
  label: string;
  onBack?: () => void;
  onClose: () => void;
}