import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateApartmentDto, ListApartmentsQueryDto, UpdateApartmentDto } from '@apartment-listing/shared';
import { apartmentsApi } from '../api';

/**
 * Query keys for apartments
 */
export const apartmentKeys = {
  all: ['apartments'] as const,
  lists: () => [...apartmentKeys.all, 'list'] as const,
  list: (filters: ListApartmentsQueryDto) => [...apartmentKeys.lists(), filters] as const,
  details: () => [...apartmentKeys.all, 'detail'] as const,
  detail: (id: string) => [...apartmentKeys.details(), id] as const,
};

/**
 * Hook to fetch all apartments with filters and pagination
 */
export const useApartments = (query?: ListApartmentsQueryDto) =>
  useQuery({
    queryKey: apartmentKeys.list(query || {}),
    queryFn: () => apartmentsApi.getAll(query),
  });

/**
 * Hook to fetch a single apartment by ID
 */
export const useApartment = (id: string) =>
  useQuery({
    queryKey: apartmentKeys.detail(id),
    queryFn: () => apartmentsApi.getById(id),
    enabled: !!id,
  });

/**
 * Hook to create a new apartment
 */
export const useCreateApartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateApartmentDto) => apartmentsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apartmentKeys.lists() });
    },
  });
};

/**
 * Hook to update an apartment
 */
export const useUpdateApartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateApartmentDto }) => apartmentsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: apartmentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: apartmentKeys.detail(variables.id) });
    },
  });
};

/**
 * Hook to delete an apartment
 */
export const useDeleteApartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apartmentsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apartmentKeys.lists() });
    },
  });
};
