export interface FilterBaseProps {
  icon: React.ElementType;
  label: string;
  isSelected?: boolean;
}

export interface FilterCommandData {
  label: string;
  header?: string | null;
  icon?: React.ElementType;
};

export interface FilterCommandProps extends FilterBaseProps {
  placeholder: string;
  selectedValues: string[];
  onSelectionChange: (value: string[]) => void;
  data: FilterCommandData[];
}