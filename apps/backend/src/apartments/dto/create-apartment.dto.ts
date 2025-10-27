import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { CreateApartmentDto as SharedCreateApartmentDto } from '@apartment-listing/shared';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateApartmentDto implements SharedCreateApartmentDto {
  @ApiProperty({
    description: 'Unit name',
    example: 'Palm Hills B-305',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  unitName = '';

  @ApiProperty({
    description: 'Unit number',
    example: 'B-305',
    minLength: 1,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(20)
  unitNumber = '';

  @ApiProperty({
    description: 'Project name',
    example: 'Palm Hills',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  project = '';

  @ApiPropertyOptional({
    description: 'Apartment description',
    example:
      'Luxurious apartment with modern amenities and stunning city views. Features high-end finishes and spacious living areas.',
    maxLength: 1000,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({
    description: 'Street address',
    example: '45 Palm Hills Street, New Cairo',
    minLength: 5,
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(200)
  address = '';

  @ApiProperty({
    description: 'City name',
    example: 'New Cairo',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  city = '';

  @ApiProperty({
    description: 'Price per month',
    example: 4500000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  price = 0;

  @ApiProperty({
    description: 'Number of bedrooms',
    example: 3,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  bedrooms = 0;

  @ApiProperty({
    description: 'Number of bathrooms',
    example: 2,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  bathrooms = 0;

  @ApiProperty({
    description: 'Area in square meters',
    example: 150.5,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  area = 0;

  @ApiPropertyOptional({
    description: 'Array of image URLs',
    example: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsUrl({}, { each: true })
  @IsOptional()
  images?: string[];

  @ApiPropertyOptional({
    description: 'Availability status',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  available?: boolean;
}
