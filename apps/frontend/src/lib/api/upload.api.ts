import { UploadFilesResponseDto } from '@apartment-listing/shared';
import apiClient from './client';

/**
 * Upload API service
 * Handles file uploads
 */
export const uploadApi = {
  /**
   * Upload apartment images
   */
  uploadImages: async (files: File[]): Promise<UploadFilesResponseDto> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await apiClient.post<UploadFilesResponseDto>('/upload/apartments', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
