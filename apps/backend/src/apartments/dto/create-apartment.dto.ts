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
    example: 'Luxury Apartment',
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
    example: 'A-101',
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
    example: 'Sunrise Towers',
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
    example: 'Beautiful apartment with city view',
    maxLength: 1000,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({
    description: 'Street address',
    example: '123 Main Street',
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
    example: 'Cairo',
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
    example: 15000,
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
    example: 120,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  area = 0;

  @ApiPropertyOptional({
    description: 'Array of image URLs',
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
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
