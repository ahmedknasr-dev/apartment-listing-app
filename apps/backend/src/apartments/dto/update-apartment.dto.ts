import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

import { UpdateApartmentDto as SharedUpdateApartmentDto } from '@apartment-listing/shared';

import { CreateApartmentDto } from './create-apartment.dto';

export class UpdateApartmentDto
  extends PartialType(CreateApartmentDto)
  implements SharedUpdateApartmentDto
{
  @ApiPropertyOptional({
    description: 'Unit name',
    example: 'Hyde Park C-402',
  })
  unitName?: string;

  @ApiPropertyOptional({
    description: 'Unit number',
    example: 'C-402',
  })
  unitNumber?: string;

  @ApiPropertyOptional({
    description: 'Project name',
    example: 'Hyde Park',
  })
  project?: string;

  @ApiPropertyOptional({
    description: 'Apartment description',
    example:
      'Modern design with state-of-the-art facilities. Includes gym, swimming pool, and 24/7 security.',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Street address',
    example: '78 Hyde Park Street, Cairo',
  })
  address?: string;

  @ApiPropertyOptional({
    description: 'City name',
    example: 'Cairo',
  })
  city?: string;

  @ApiPropertyOptional({
    description: 'Price per month',
    example: 5200000,
  })
  price?: number;

  @ApiPropertyOptional({
    description: 'Number of bedrooms',
    example: 4,
  })
  bedrooms?: number;

  @ApiPropertyOptional({
    description: 'Number of bathrooms',
    example: 3,
  })
  bathrooms?: number;

  @ApiPropertyOptional({
    description: 'Area in square meters',
    example: 180.75,
  })
  area?: number;

  @ApiPropertyOptional({
    description: 'Array of image URLs',
    example: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
    ],
    type: [String],
  })
  images?: string[];

  @ApiPropertyOptional({
    description: 'Availability status',
    example: false,
  })
  available?: boolean;
}
