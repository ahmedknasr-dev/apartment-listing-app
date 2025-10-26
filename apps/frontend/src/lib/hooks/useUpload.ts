import { useMutation } from '@tanstack/react-query';
import { uploadApi } from '../api';

/**
 * Hook to upload apartment images
 */
export const useUploadImages = () =>
  useMutation({
    mutationFn: (files: File[]) => uploadApi.uploadImages(files),
  });
