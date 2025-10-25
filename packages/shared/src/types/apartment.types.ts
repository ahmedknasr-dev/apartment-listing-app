/**
 * Apartment entity type
 */
export interface Apartment {
  id: string;
  unitName: string;
  unitNumber: string;
  project: string;
  description: string | null;
  address: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Apartment filters for queries
 */
export interface ApartmentFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  minArea?: number;
  maxArea?: number;
  available?: boolean;
  project?: string;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: keyof Apartment;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
