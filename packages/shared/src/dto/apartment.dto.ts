/**
 * Data Transfer Objects (DTOs) for Apartment API
 * Used for validation and type safety in API requests/responses
 */

/**
 * DTO for creating a new apartment
 */
export interface CreateApartmentDto {
  unitName: string;
  unitNumber: string;
  project: string;
  description?: string;
  address: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images?: string[];
  available?: boolean;
}

/**
 * DTO for updating an existing apartment
 * All fields are optional
 */
export interface UpdateApartmentDto {
  unitName?: string;
  unitNumber?: string;
  project?: string;
  description?: string | null;
  address?: string;
  city?: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  images?: string[];
  available?: boolean;
}

/**
 * DTO for apartment response
 * Includes all apartment data
 */
export interface ApartmentResponseDto {
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
  createdAt: string; // ISO string format for JSON
  updatedAt: string; // ISO string format for JSON
}

/**
 * DTO for query parameters when listing apartments
 */
export interface ListApartmentsQueryDto {
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
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * DTO for paginated apartment list response
 */
export interface PaginatedApartmentsResponseDto {
  data: ApartmentResponseDto[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

/**
 * DTO for error responses
 */
export interface ErrorResponseDto {
  statusCode: number;
  message: string | string[];
  error?: string;
  timestamp?: string;
  path?: string;
}
