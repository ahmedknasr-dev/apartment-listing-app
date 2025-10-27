import {
  ApartmentResponseDto,
  CreateApartmentDto,
  UpdateApartmentDto,
  ListApartmentsQueryDto,
} from '@apartment-listing/shared';

/**
 * Props for DashboardApartmentCard component
 */
export interface ApartmentCardProps {
  apartment: ApartmentResponseDto;
  onEdit: (apartment: ApartmentResponseDto) => void;
  onDelete: (id: string) => void;
}

/**
 * Props for ApartmentList component
 */
export interface ApartmentListProps {
  apartments: ApartmentResponseDto[];
  isLoading: boolean;
  error: string | null;
  onEdit: (apartment: ApartmentResponseDto) => void;
  onDelete: (id: string) => void;
}

/**
 * Props for ApartmentForm component
 */
export interface ApartmentFormProps {
  apartment?: ApartmentResponseDto | null;
  onSubmit: (data: CreateApartmentDto | UpdateApartmentDto) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

/**
 * Props for ApartmentModal component
 */
export interface ApartmentModalProps {
  show: boolean;
  apartment?: ApartmentResponseDto | null;
  onHide: () => void;
  onSubmit: (data: CreateApartmentDto | UpdateApartmentDto) => Promise<void>;
  isLoading: boolean;
}

/**
 * Props for ImageUpload component
 */
export interface ImageUploadProps {
  images: string[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
}

/**
 * Props for SearchBar component
 */
export interface SearchBarProps {
  filters: Partial<ListApartmentsQueryDto>;
  onSearch: (filters: Partial<ListApartmentsQueryDto>) => void;
  onReset: () => void;
}

/**
 * Props for Pagination component
 */
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Props for TextInputField component
 */
export interface TextInputFieldProps {
  label: string;
  field: keyof ListApartmentsQueryDto;
  placeholder: string;
  value: string;
  onChange: (field: keyof ListApartmentsQueryDto, value: string) => void;
  colSize?: { xs?: number; md?: number; lg?: number };
}

/**
 * Props for NumberInputField component
 */
export interface NumberInputFieldProps {
  label: string;
  field: keyof ListApartmentsQueryDto;
  placeholder: string;
  value: number | string;
  onChange: (field: keyof ListApartmentsQueryDto, value: number) => void;
  colSize?: { xs?: number; md?: number; lg?: number };
  prefix?: string;
}

/**
 * Props for DeleteConfirmModal component
 */
export interface DeleteConfirmModalProps {
  show: boolean;
  apartmentName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}
