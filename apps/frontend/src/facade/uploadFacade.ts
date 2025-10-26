import { useCallback } from 'react';
import { uploadApi } from '@/lib/api';
import { useApartmentContext } from '@/store/ApartmentContext';
import { ApartmentActionType } from '@/store/apartmentReducer';
import toastUtils from '@/lib/utils/toast';

/**
 * Facade hook for upload operations
 */
export const useUploadFacade = () => {
  const { dispatch } = useApartmentContext();

  /**
   * Upload apartment images
   */
  const uploadImages = useCallback(
    async (files: File[]) => {
      try {
        dispatch({ type: ApartmentActionType.SET_LOADING, payload: true });
        dispatch({ type: ApartmentActionType.CLEAR_ERROR });

        const response = await uploadApi.uploadImages(files);

        toastUtils.success(`${files.length} image(s) uploaded successfully`);
        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to upload images';
        dispatch({ type: ApartmentActionType.SET_ERROR, payload: errorMessage });
        toastUtils.error(errorMessage);
        throw error;
      } finally {
        dispatch({ type: ApartmentActionType.SET_LOADING, payload: false });
      }
    },
    [dispatch],
  );

  return {
    uploadImages,
  };
};
