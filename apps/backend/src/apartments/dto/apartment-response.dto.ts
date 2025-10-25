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
    example: 'Luxury Apartment',
  })
  unitName = '';

  @ApiProperty({
    description: 'Unit number',
    example: 'A-101',
  })
  unitNumber = '';

  @ApiProperty({
    description: 'Project name',
    example: 'Sunrise Towers',
  })
  project = '';

  @ApiProperty({
    description: 'Apartment description',
    example: 'Beautiful apartment with city view',
    nullable: true,
  })
  description: string | null = null;

  @ApiProperty({
    description: 'Street address',
    example: '123 Main Street',
  })
  address = '';

  @ApiProperty({
    description: 'City name',
    example: 'Cairo',
  })
  city = '';

  @ApiProperty({
    description: 'Price per month',
    example: 15000,
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
    example: 120,
  })
  area = 0;

  @ApiProperty({
    description: 'Array of image URLs',
    type: [String],
    example: ['https://example.com/image1.jpg'],
  })
  images: string[] = [];

  @ApiProperty({
    description: 'Availability status',
    example: true,
  })
  available = true;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-10-25T10:00:00.000Z',
  })
  createdAt = '';

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-10-25T10:00:00.000Z',
  })
  updatedAt = '';
}
