import { type Apartment as PrismaApartment } from '@prisma/client';

/**
 * Apartment entity representing an apartment listing in the system.
 * Implements the Prisma Apartment model.
 */
export class ApartmentEntity implements PrismaApartment {
  id = '';
  unitName = '';
  unitNumber = '';
  project = '';
  description: string | null = null;
  address = '';
  city = '';
  price = 0;
  bedrooms = 0;
  bathrooms = 0;
  area = 0;
  images: string[] = [];
  available = true;
  createdAt = '';
  updatedAt = '';

  /**
   * Creates an instance of ApartmentEntity.
   * @param partial - Partial apartment data to initialize the entity
   */
  constructor(partial: Partial<ApartmentEntity>) {
    Object.assign(this, partial);
  }
}
