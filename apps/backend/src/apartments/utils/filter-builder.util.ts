import type { QueryApartmentDto } from '../dto/query-apartment.dto';
import type { Prisma } from '@prisma/client';

type FilterInput = Omit<
  QueryApartmentDto,
  'page' | 'limit' | 'sortBy' | 'sortOrder'
>;

/**
 * Utility for building Prisma where clauses from query filters
 */
export class ApartmentFilterBuilderService {
  /**
   * Build a complete where clause from apartment query filters
   */
  static buildApartmentFilters(
    filters: FilterInput,
  ): Prisma.ApartmentWhereInput {
    const where: Prisma.ApartmentWhereInput = {};

    // Search filter - searches across multiple fields
    if (filters.search) {
      const searchTerm = filters.search;
      where.OR = [
        { unitName: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { address: { contains: searchTerm, mode: 'insensitive' } },
        { city: { contains: searchTerm, mode: 'insensitive' } },
        { project: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    // String filters with case-insensitive partial match
    if (filters.city) {
      where.city = { contains: filters.city, mode: 'insensitive' };
    }

    if (filters.project) {
      where.project = { contains: filters.project, mode: 'insensitive' };
    }

    // Range filters for numeric fields
    this.addRangeFilter(where, 'price', filters.minPrice, filters.maxPrice);
    this.addRangeFilter(
      where,
      'bedrooms',
      filters.minBedrooms,
      filters.maxBedrooms,
    );
    this.addRangeFilter(
      where,
      'bathrooms',
      filters.minBathrooms,
      filters.maxBathrooms,
    );
    this.addRangeFilter(where, 'area', filters.minArea, filters.maxArea);

    // Boolean filter
    if (filters.available !== undefined) {
      where.available = filters.available;
    }

    return where;
  }

  /**
   * Add range filter for numeric fields
   */
  private static addRangeFilter(
    where: Prisma.ApartmentWhereInput,
    field: 'price' | 'bedrooms' | 'bathrooms' | 'area',
    min?: number,
    max?: number,
  ): void {
    if (min !== undefined || max !== undefined) {
      const rangeFilter: { gte?: number; lte?: number } = {};

      if (min !== undefined) {
        rangeFilter.gte = min;
      }
      if (max !== undefined) {
        rangeFilter.lte = max;
      }

      where[field] = rangeFilter;
    }
  }
}
