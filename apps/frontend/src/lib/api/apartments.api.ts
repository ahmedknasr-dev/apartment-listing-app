import {
  ApartmentResponseDto,
  CreateApartmentDto,
  ListApartmentsQueryDto,
  PaginatedApartmentsResponseDto,
  UpdateApartmentDto,
} from '@apartment-listing/shared';
import apiClient from './client';

/**
 * Apartments API service
 * Handles all apartment-related API calls
 */
export const apartmentsApi = {
  /**
   * Get all apartments with optional filters and pagination
   */
  getAll: async (query?: ListApartmentsQueryDto): Promise<PaginatedApartmentsResponseDto> => {
    const response = await apiClient.get<PaginatedApartmentsResponseDto>('/apartments', { params: query });
    return response.data;
  },

  /**
   * Get a single apartment by ID
   */
  getById: async (id: string): Promise<ApartmentResponseDto> => {
    const response = await apiClient.get<ApartmentResponseDto>(`/apartments/${id}`);
    return response.data;
  },

  /**
   * Create a new apartment
   */
  create: async (data: CreateApartmentDto): Promise<ApartmentResponseDto> => {
    const response = await apiClient.post<ApartmentResponseDto>('/apartments', data);
    return response.data;
  },

  /**
   * Update an existing apartment
   */
  update: async (id: string, data: UpdateApartmentDto): Promise<ApartmentResponseDto> => {
    const response = await apiClient.patch<ApartmentResponseDto>(`/apartments/${id}`, data);
    return response.data;
  },

  /**
   * Delete an apartment
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/apartments/${id}`);
  },
};
