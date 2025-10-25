import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

import { UpdateApartmentDto as SharedUpdateApartmentDto } from '@apartment-listing/shared';

import { CreateApartmentDto } from './create-apartment.dto';

export class UpdateApartmentDto
  extends PartialType(CreateApartmentDto)
  implements SharedUpdateApartmentDto
{
  @ApiPropertyOptional({
    description: 'Unit name',
    example: 'Luxury Apartment',
  })
  unitName?: string;

  @ApiPropertyOptional({
    description: 'Unit number',
    example: 'A-101',
  })
  unitNumber?: string;

  @ApiPropertyOptional({
    description: 'Project name',
    example: 'Sunrise Towers',
  })
  project?: string;

  @ApiPropertyOptional({
    description: 'Apartment description',
    example: 'Beautiful apartment with city view',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Street address',
    example: '123 Main Street',
  })
  address?: string;

  @ApiPropertyOptional({
    description: 'City name',
    example: 'Cairo',
  })
  city?: string;

  @ApiPropertyOptional({
    description: 'Price per month',
    example: 15000,
  })
  price?: number;

  @ApiPropertyOptional({
    description: 'Number of bedrooms',
    example: 3,
  })
  bedrooms?: number;

  @ApiPropertyOptional({
    description: 'Number of bathrooms',
    example: 2,
  })
  bathrooms?: number;

  @ApiPropertyOptional({
    description: 'Area in square meters',
    example: 120,
  })
  area?: number;

  @ApiPropertyOptional({
    description: 'Array of image URLs',
    type: [String],
  })
  images?: string[];

  @ApiPropertyOptional({
    description: 'Availability status',
    example: true,
  })
  available?: boolean;
}
