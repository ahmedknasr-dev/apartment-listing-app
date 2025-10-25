import { type Apartment as PrismaApartment } from '@prisma/client';

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

  constructor(partial: Partial<ApartmentEntity>) {
    Object.assign(this, partial);
  }
}
