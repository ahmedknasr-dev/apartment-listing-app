import type { UpdateApartmentDto } from '../dto/update-apartment.dto';
import type { SortField, SortOrder } from '@apartment-listing/shared';

/**
 * Utility service for mapping and transforming apartment data.
 * Provides methods for building update data objects, pagination calculations, and sort orders.
 */
export class ApartmentDataMapperService {
  /**
   * Build update data object, only including defined fields.
   * Handles optional fields and null values properly.
   * @param updateDto - The partial apartment data to update
   * @returns Object containing only the fields that are defined in updateDto
   */
  static buildUpdateData(
    updateDto: UpdateApartmentDto,
  ): Partial<UpdateApartmentDto> {
    const data: Partial<UpdateApartmentDto> = {};

    /**
     * Helper function to add field to data object if it exists in updateDto
     */
    const addField = (key: keyof UpdateApartmentDto): void => {
      if (updateDto[key] !== undefined) {
        // @ts-expect-error Dynamic key assignment is safe here as key is validated
        data[key] = updateDto[key];
      }
    };

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
   * Calculate pagination skip value.
   * @param page - Current page number (1-based)
   * @param limit - Number of items per page
   * @returns Number of items to skip for the given page
   */
  static calculateSkip(page: number, limit: number): number {
    return (page - 1) * limit;
  }

  /**
   * Build sort order object for Prisma query.
   * @param sortBy - Field to sort by
   * @param sortOrder - Sort direction (asc or desc)
   * @returns Prisma sort order object
   */
  static buildSortOrder(
    sortBy: SortField,
    sortOrder: SortOrder,
  ): Record<string, SortOrder> {
    return { [sortBy]: sortOrder };
  }
}
