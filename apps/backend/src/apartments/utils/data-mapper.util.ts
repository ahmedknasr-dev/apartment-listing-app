import type { UpdateApartmentDto } from '../dto/update-apartment.dto';
import type { SortField, SortOrder } from '@apartment-listing/shared';

/**
 * Utility for mapping and transforming data
 */
export class ApartmentDataMapperService {
  /**
   * Build update data object, only including defined fields
   * Handles optional fields and null values properly
   */
  static buildUpdateData(
    updateDto: UpdateApartmentDto,
  ): Partial<UpdateApartmentDto> {
    const data: Partial<UpdateApartmentDto> = {};
    const addField = (key: keyof UpdateApartmentDto): void => {
      if (updateDto[key] !== undefined) {
        // @ts-expect-error - Dynamic key assignment
        data[key] = updateDto[key];
      }
    };

    // Add all possible update fields
    addField('unitName');
    addField('unitNumber');
    addField('project');
    addField('description');
    addField('address');
    addField('city');
    addField('price');
    addField('bedrooms');
    addField('bathrooms');
    addField('area');
    addField('images');
    addField('available');

    return data;
  }

  /**
   * Calculate pagination skip value
   */
  static calculateSkip(page: number, limit: number): number {
    return (page - 1) * limit;
  }

  /**
   * Build sort order object for Prisma
   */
  static buildSortOrder(
    sortBy: SortField,
    sortOrder: SortOrder,
  ): Record<string, SortOrder> {
    return { [sortBy]: sortOrder };
  }
}
