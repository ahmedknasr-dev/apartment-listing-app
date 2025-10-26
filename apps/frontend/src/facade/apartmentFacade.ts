import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  ApartmentResponseDto,
  CreateApartmentDto,
  ListApartmentsQueryDto,
  UpdateApartmentDto,
} from '@apartment-listing/shared';
import { apartmentsApi } from '@/lib/api';
import { useApartmentContext } from '@/store/ApartmentContext';
import { ApartmentActionType } from '@/store/apartmentReducer';
import toastUtils from '@/lib/utils/toast';

/**
 * Hook for fetching apartments
 */
export const useFetchApartments = () => {
  const { dispatch } = useApartmentContext();

  return useCallback(
    async (query?: ListApartmentsQueryDto) => {
      try {
        dispatch({ type: ApartmentActionType.SET_LOADING, payload: true });
        dispatch({ type: ApartmentActionType.CLEAR_ERROR });

        const response = await apartmentsApi.getAll(query);

        dispatch({ type: ApartmentActionType.SET_APARTMENTS, payload: response.data });
        dispatch({ type: ApartmentActionType.SET_PAGINATION, payload: response.meta });
        if (query) {
          dispatch({ type: ApartmentActionType.SET_FILTERS, payload: query });
        }

        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch apartments';
        dispatch({ type: ApartmentActionType.SET_ERROR, payload: errorMessage });
        toastUtils.error(errorMessage);
        throw error;
      } finally {
        dispatch({ type: ApartmentActionType.SET_LOADING, payload: false });
      }
    },
    [dispatch],
  );
};

/**
 * Hook for fetching a single apartment
 */
export const useFetchApartmentById = () => {
  const { dispatch } = useApartmentContext();

  return useCallback(
    async (id: string) => {
      try {
        dispatch({ type: ApartmentActionType.SET_LOADING, payload: true });
        dispatch({ type: ApartmentActionType.CLEAR_ERROR });

        const apartment = await apartmentsApi.getById(id);

        dispatch({ type: ApartmentActionType.SET_SELECTED_APARTMENT, payload: apartment });

        return apartment;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch apartment';
        dispatch({ type: ApartmentActionType.SET_ERROR, payload: errorMessage });
        toastUtils.error(errorMessage);
        throw error;
      } finally {
        dispatch({ type: ApartmentActionType.SET_LOADING, payload: false });
      }
    },
    [dispatch],
  );
};

/**
 * Hook for creating an apartment with optimistic update
 */
export const useCreateApartmentOptimistic = () => {
  const { state, dispatch } = useApartmentContext();

  return useCallback(
    async (data: CreateApartmentDto) => {
      const tempApartment: ApartmentResponseDto = {
        id: `temp-${uuidv4()}`,
        ...data,
        description: data.description || null,
        images: data.images || [],
        available: data.available ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      try {
        dispatch({ type: ApartmentActionType.CLEAR_ERROR });

        dispatch({
          type: ApartmentActionType.SET_APARTMENTS,
          payload: [tempApartment, ...state.apartments],
        });

        const newApartment = await apartmentsApi.create(data);

        dispatch({
          type: ApartmentActionType.SET_APARTMENTS,
          payload: state.apartments.map((apt) => (apt.id === tempApartment.id ? newApartment : apt)),
        });

        toastUtils.success('Apartment created successfully');
        return newApartment;
      } catch (error) {
        dispatch({
          type: ApartmentActionType.SET_APARTMENTS,
          payload: state.apartments.filter((apt) => apt.id !== tempApartment.id),
        });

        const errorMessage = error instanceof Error ? error.message : 'Failed to create apartment';
        dispatch({ type: ApartmentActionType.SET_ERROR, payload: errorMessage });
        toastUtils.error(errorMessage);
        throw error;
      }
    },
    [dispatch, state.apartments],
  );
};

/**
 * Hook for updating an apartment with optimistic update
 */
export const useUpdateApartmentOptimistic = () => {
  const { state, dispatch } = useApartmentContext();

  return useCallback(
    async (id: string, data: UpdateApartmentDto) => {
      const originalApartment = state.apartments.find((apt) => apt.id === id);

      if (!originalApartment) {
        const error = new Error('Apartment not found in state');
        dispatch({ type: ApartmentActionType.SET_ERROR, payload: error.message });
        throw error;
      }

      try {
        dispatch({ type: ApartmentActionType.CLEAR_ERROR });

        const optimisticApartment: ApartmentResponseDto = {
          ...originalApartment,
          ...data,
          updatedAt: new Date().toISOString(),
        };

        dispatch({
          type: ApartmentActionType.SET_APARTMENTS,
          payload: state.apartments.map((apt) => (apt.id === id ? optimisticApartment : apt)),
        });

        if (state.selectedApartment?.id === id) {
          dispatch({
            type: ApartmentActionType.SET_SELECTED_APARTMENT,
            payload: optimisticApartment,
          });
        }

        const updatedApartment = await apartmentsApi.update(id, data);

        dispatch({
          type: ApartmentActionType.SET_APARTMENTS,
          payload: state.apartments.map((apt) => (apt.id === id ? updatedApartment : apt)),
        });

        if (state.selectedApartment?.id === id) {
          dispatch({
            type: ApartmentActionType.SET_SELECTED_APARTMENT,
            payload: updatedApartment,
          });
        }

        toastUtils.success('Apartment updated successfully');
        return updatedApartment;
      } catch (error) {
        dispatch({
          type: ApartmentActionType.SET_APARTMENTS,
          payload: state.apartments.map((apt) => (apt.id === id ? originalApartment : apt)),
        });

        if (state.selectedApartment?.id === id) {
          dispatch({
            type: ApartmentActionType.SET_SELECTED_APARTMENT,
            payload: originalApartment,
          });
        }

        const errorMessage = error instanceof Error ? error.message : 'Failed to update apartment';
        dispatch({ type: ApartmentActionType.SET_ERROR, payload: errorMessage });
        toastUtils.error(errorMessage);
        throw error;
      }
    },
    [dispatch, state.apartments, state.selectedApartment],
  );
};

/**
 * Hook for deleting an apartment with optimistic update
 */
export const useDeleteApartmentOptimistic = () => {
  const { state, dispatch } = useApartmentContext();

  return useCallback(
    async (id: string) => {
      const originalApartment = state.apartments.find((apt) => apt.id === id);

      if (!originalApartment) {
        const error = new Error('Apartment not found in state');
        dispatch({ type: ApartmentActionType.SET_ERROR, payload: error.message });
        throw error;
      }

      try {
        dispatch({ type: ApartmentActionType.CLEAR_ERROR });

        dispatch({
          type: ApartmentActionType.SET_APARTMENTS,
          payload: state.apartments.filter((apt) => apt.id !== id),
        });

        if (state.selectedApartment?.id === id) {
          dispatch({
            type: ApartmentActionType.SET_SELECTED_APARTMENT,
            payload: null,
          });
        }

        await apartmentsApi.delete(id);

        toastUtils.success('Apartment deleted successfully');
        return true;
      } catch (error) {
        dispatch({
          type: ApartmentActionType.SET_APARTMENTS,
          payload: [...state.apartments, originalApartment],
        });

        const errorMessage = error instanceof Error ? error.message : 'Failed to delete apartment';
        dispatch({ type: ApartmentActionType.SET_ERROR, payload: errorMessage });
        toastUtils.error(errorMessage);
        throw error;
      }
    },
    [dispatch, state.apartments, state.selectedApartment],
  );
};

/**
 * Facade hook for apartment CRUD operations with optimistic updates
 */
export const useApartmentFacade = () => {
  const { state, dispatch } = useApartmentContext();

  const fetchApartments = useFetchApartments();
  const fetchApartmentById = useFetchApartmentById();
  const createApartment = useCreateApartmentOptimistic();
  const updateApartment = useUpdateApartmentOptimistic();
  const deleteApartment = useDeleteApartmentOptimistic();

  const clearSelectedApartment = useCallback(() => {
    dispatch({
      type: ApartmentActionType.SET_SELECTED_APARTMENT,
      payload: null,
    });
  }, [dispatch]);

  const updateFilters = useCallback(
    (filters: Partial<ListApartmentsQueryDto>) => {
      dispatch({ type: ApartmentActionType.SET_FILTERS, payload: filters });
    },
    [dispatch],
  );

  const resetFilters = useCallback(() => {
    dispatch({ type: ApartmentActionType.RESET_FILTERS });
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch({ type: ApartmentActionType.CLEAR_ERROR });
  }, [dispatch]);

  return {
    apartments: state.apartments,
    selectedApartment: state.selectedApartment,
    filters: state.filters,
    isLoading: state.isLoading,
    error: state.error,
    pagination: state.pagination,
    fetchApartments,
    fetchApartmentById,
    createApartment,
    updateApartment,
    deleteApartment,
    clearSelectedApartment,
    updateFilters,
    resetFilters,
    clearError,
  };
};
