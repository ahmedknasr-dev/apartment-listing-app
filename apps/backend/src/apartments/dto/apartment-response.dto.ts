import { ApiProperty } from '@nestjs/swagger';

import { ApartmentResponseDto as SharedApartmentResponseDto } from '@apartment-listing/shared';

export class ApartmentResponseDto implements SharedApartmentResponseDto {
  @ApiProperty({
    description: 'Apartment ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id = '';

  @ApiProperty({
    description: 'Unit name',
    example: 'Madinaty A-803',
  })
  unitName = '';

  @ApiProperty({
    description: 'Unit number',
    example: 'A-803',
  })
  unitNumber = '';

  @ApiProperty({
    description: 'Project name',
    example: 'Madinaty',
  })
  project = '';

  @ApiProperty({
    description: 'Apartment description',
    example:
      'Spacious apartment with natural lighting throughout. Large balcony with panoramic views.',
    nullable: true,
  })
  description: string | null = null;

  @ApiProperty({
    description: 'Street address',
    example: '42 Madinaty Street, Cairo',
  })
  address = '';

  @ApiProperty({
    description: 'City name',
    example: 'Cairo',
  })
  city = '';

  @ApiProperty({
    description: 'Price per month',
    example: 3750000,
  })
  price = 0;

  @ApiProperty({
    description: 'Number of bedrooms',
    example: 3,
  })
  bedrooms = 0;

  @ApiProperty({
    description: 'Number of bathrooms',
    example: 2,
  })
  bathrooms = 0;

  @ApiProperty({
    description: 'Area in square meters',
    example: 125.8,
  })
  area = 0;

  @ApiProperty({
    description: 'Array of image URLs',
    type: [String],
    example: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
  })
  images: string[] = [];

  @ApiProperty({
    description: 'Availability status',
    example: true,
  })
  available = true;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2025-10-27T10:30:00.000Z',
  })
  createdAt = '';

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2025-10-27T10:30:00.000Z',
  })
  updatedAt = '';
}
