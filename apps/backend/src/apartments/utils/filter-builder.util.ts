import { NumericField } from '@apartment-listing/shared';

import type { QueryApartmentDto } from '../dto/query-apartment.dto';
import type { Prisma } from '@prisma/client';

type FilterInput = Omit<
  QueryApartmentDto,
  'page' | 'limit' | 'sortBy' | 'sortOrder'
>;

/**
 * Utility service for building Prisma where clauses from query filters.
 * Provides methods to construct complex database queries based on apartment search criteria.
 */
export class ApartmentFilterBuilderService {
  /**
   * Builds a complete Prisma where clause from apartment query filters.
   * Supports text search across multiple fields, range filters for numeric values,
   * and boolean filters for availability.
   * @param filters - The filter parameters from the query
   * @returns A Prisma where input object ready for database queries
   */
  static buildApartmentFilters(
    filters: FilterInput,
  ): Prisma.ApartmentWhereInput {
    const where: Prisma.ApartmentWhereInput = {};

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

    if (filters.city) {
      where.city = { contains: filters.city, mode: 'insensitive' };
    }

    if (filters.project) {
      where.project = { contains: filters.project, mode: 'insensitive' };
    }

    this.addRangeFilter(
      where,
      NumericField.PRICE,
      filters.minPrice,
      filters.maxPrice,
    );
    this.addRangeFilter(
      where,
      NumericField.BEDROOMS,
      filters.minBedrooms,
      filters.maxBedrooms,
    );
    this.addRangeFilter(
      where,
      NumericField.BATHROOMS,
      filters.minBathrooms,
      filters.maxBathrooms,
    );
    this.addRangeFilter(
      where,
      NumericField.AREA,
      filters.minArea,
      filters.maxArea,
    );

    if (filters.available !== undefined) {
      where.available = filters.available;
    }

    return where;
  }

  /**
   * Adds a range filter for numeric fields to the where clause.
   * Modifies the where object in place by adding gte/lte filters.
   * @param where - The Prisma where input object to modify
   * @param field - The numeric field to filter on
   * @param min - Optional minimum value (inclusive)
   * @param max - Optional maximum value (inclusive)
   */
  private static addRangeFilter(
    where: Prisma.ApartmentWhereInput,
    field: NumericField,
    min?: number,
    max?: number,
  ): void {
    if (min !== undefined || max !== undefined) {
      const rangeFilter: Prisma.IntFilter = {};

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
