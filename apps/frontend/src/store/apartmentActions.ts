import { useCallback } from 'react';
import { ListApartmentsQueryDto } from '@apartment-listing/shared';
import { useApartmentContext } from './ApartmentContext';
import { ApartmentActionType } from './apartmentReducer';

/**
 * Hook to manage apartment actions
 */
export const useApartmentActions = () => {
  const { dispatch } = useApartmentContext();

  const setFilters = useCallback(
    (filters: Partial<ListApartmentsQueryDto>) => {
      dispatch({ type: ApartmentActionType.SET_FILTERS, payload: filters });
    },
    [dispatch],
  );

  const resetFilters = useCallback(() => {
    dispatch({ type: ApartmentActionType.RESET_FILTERS });
  }, [dispatch]);

  const setLoading = useCallback(
    (isLoading: boolean) => {
      dispatch({ type: ApartmentActionType.SET_LOADING, payload: isLoading });
    },
    [dispatch],
  );

  const setError = useCallback(
    (error: string | null) => {
      dispatch({ type: ApartmentActionType.SET_ERROR, payload: error });
    },
    [dispatch],
  );

  const clearError = useCallback(() => {
    dispatch({ type: ApartmentActionType.CLEAR_ERROR });
  }, [dispatch]);

  return {
    setFilters,
    resetFilters,
    setLoading,
    setError,
    clearError,
  };
};

/**
 * Hook to get apartment state selectors
 */
export const useApartmentSelectors = () => {
  const { state } = useApartmentContext();

  return {
    apartments: state.apartments,
    selectedApartment: state.selectedApartment,
    filters: state.filters,
    isLoading: state.isLoading,
    error: state.error,
    pagination: state.pagination,
  };
};
