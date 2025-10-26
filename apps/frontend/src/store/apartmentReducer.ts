import { ApartmentResponseDto, ListApartmentsQueryDto } from '@apartment-listing/shared';

/**
 * Apartment State Interface
 */
export interface ApartmentState {
  apartments: ApartmentResponseDto[];
  selectedApartment: ApartmentResponseDto | null;
  filters: ListApartmentsQueryDto;
  isLoading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

/**
 * Apartment Action Types
 */
export enum ApartmentActionType {
  SET_APARTMENTS = 'SET_APARTMENTS',
  SET_SELECTED_APARTMENT = 'SET_SELECTED_APARTMENT',
  SET_FILTERS = 'SET_FILTERS',
  RESET_FILTERS = 'RESET_FILTERS',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_PAGINATION = 'SET_PAGINATION',
  CLEAR_ERROR = 'CLEAR_ERROR',
}

/**
 * Apartment Actions
 */
export type ApartmentAction =
  | { type: ApartmentActionType.SET_APARTMENTS; payload: ApartmentResponseDto[] }
  | { type: ApartmentActionType.SET_SELECTED_APARTMENT; payload: ApartmentResponseDto | null }
  | { type: ApartmentActionType.SET_FILTERS; payload: Partial<ListApartmentsQueryDto> }
  | { type: ApartmentActionType.RESET_FILTERS }
  | { type: ApartmentActionType.SET_LOADING; payload: boolean }
  | { type: ApartmentActionType.SET_ERROR; payload: string | null }
  | {
      type: ApartmentActionType.SET_PAGINATION;
      payload: {
        currentPage: number;
        itemsPerPage: number;
        totalItems: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    }
  | { type: ApartmentActionType.CLEAR_ERROR };

/**
 * Initial Apartment State
 */
export const initialApartmentState: ApartmentState = {
  apartments: [],
  selectedApartment: null,
  filters: {
    page: 1,
    limit: 10,
  },
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

/**
 * Apartment Reducer
 */
export const apartmentReducer = (state: ApartmentState, action: ApartmentAction): ApartmentState => {
  switch (action.type) {
    case ApartmentActionType.SET_APARTMENTS:
      return {
        ...state,
        apartments: action.payload,
        isLoading: false,
        error: null,
      };

    case ApartmentActionType.SET_SELECTED_APARTMENT:
      return {
        ...state,
        selectedApartment: action.payload,
        isLoading: false,
        error: null,
      };

    case ApartmentActionType.SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };

    case ApartmentActionType.RESET_FILTERS:
      return {
        ...state,
        filters: initialApartmentState.filters,
      };

    case ApartmentActionType.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case ApartmentActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case ApartmentActionType.SET_PAGINATION:
      return {
        ...state,
        pagination: action.payload,
      };

    case ApartmentActionType.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
