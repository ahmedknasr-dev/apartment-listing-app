'use client';

import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';
import { ApartmentAction, apartmentReducer, ApartmentState, initialApartmentState } from './apartmentReducer';

/**
 * Apartment Context Type
 */
interface ApartmentContextType {
  state: ApartmentState;
  dispatch: Dispatch<ApartmentAction>;
}

/**
 * Create Apartment Context
 */
const ApartmentContext = createContext<ApartmentContextType | undefined>(undefined);

/**
 * Apartment Provider Props
 */
interface ApartmentProviderProps {
  children: ReactNode;
}

/**
 * Apartment Provider Component
 */
export const ApartmentProvider = ({ children }: ApartmentProviderProps) => {
  const [state, dispatch] = useReducer(apartmentReducer, initialApartmentState);

  return <ApartmentContext.Provider value={{ state, dispatch }}>{children}</ApartmentContext.Provider>;
};

/**
 * Hook to use Apartment Context
 */
export const useApartmentContext = () => {
  const context = useContext(ApartmentContext);

  if (context === undefined) {
    throw new Error('useApartmentContext must be used within an ApartmentProvider');
  }

  return context;
};
