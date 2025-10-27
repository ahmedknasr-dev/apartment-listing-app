import { ListApartmentsQueryDto } from '@apartment-listing/shared';

export type FilterFieldType = 'text' | 'number' | 'select' | 'number-range';

export interface ColSize {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FilterField {
  field: keyof ListApartmentsQueryDto;
  label: string;
  type: FilterFieldType;
  placeholder?: string;
  icon?: string;
  prefix?: string;
  colSize?: ColSize;
  size?: 'sm' | 'lg';
  options?: SelectOption[];
}

export interface FilterGroup {
  title?: string;
  icon?: string;
  fields: FilterField[];
}
