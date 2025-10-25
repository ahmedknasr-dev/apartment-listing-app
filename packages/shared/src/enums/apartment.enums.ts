/**
 * Enums for Apartment API
 * Shared between frontend and backend
 */

/**
 * Sort field options for apartment queries
 */
export enum SortField {
  PRICE = 'price',
  AREA = 'area',
  BEDROOMS = 'bedrooms',
  BATHROOMS = 'bathrooms',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

/**
 * Sort order options
 */
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

/**
 * Filter field options for apartment queries
 */
export enum FilterField {
  SEARCH = 'search',
  CITY = 'city',
  PROJECT = 'project',
  MIN_PRICE = 'minPrice',
  MAX_PRICE = 'maxPrice',
  MIN_BEDROOMS = 'minBedrooms',
  MAX_BEDROOMS = 'maxBedrooms',
  MIN_BATHROOMS = 'minBathrooms',
  MAX_BATHROOMS = 'maxBathrooms',
  MIN_AREA = 'minArea',
  MAX_AREA = 'maxArea',
  AVAILABLE = 'available',
}

/**
 * Numeric field names for range filters
 */
export enum NumericField {
  PRICE = 'price',
  BEDROOMS = 'bedrooms',
  BATHROOMS = 'bathrooms',
  AREA = 'area',
}
