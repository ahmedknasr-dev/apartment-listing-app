import { ApiPropertyOptional } from '@nestjs/swagger';

import { ListApartmentsQueryDto as SharedQueryDto } from '@apartment-listing/shared';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export enum SortField {
  PRICE = 'price',
  AREA = 'area',
  BEDROOMS = 'bedrooms',
  BATHROOMS = 'bathrooms',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class QueryApartmentDto implements SharedQueryDto {
  @ApiPropertyOptional({
    description:
      'Search term to search across unit name, description, address, city, and project',
    example: 'Cairo apartment',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'City filter',
    example: 'Cairo',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    description: 'Project filter',
    example: 'Sunrise Towers',
  })
  @IsOptional()
  @IsString()
  project?: string;

  @ApiPropertyOptional({
    description: 'Minimum price',
    example: 10000,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Maximum price',
    example: 50000,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({
    description: 'Minimum number of bedrooms',
    example: 2,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minBedrooms?: number;

  @ApiPropertyOptional({
    description: 'Maximum number of bedrooms',
    example: 5,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxBedrooms?: number;

  @ApiPropertyOptional({
    description: 'Minimum number of bathrooms',
    example: 1,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minBathrooms?: number;

  @ApiPropertyOptional({
    description: 'Maximum number of bathrooms',
    example: 3,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxBathrooms?: number;

  @ApiPropertyOptional({
    description: 'Minimum area in square meters',
    example: 80,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minArea?: number;

  @ApiPropertyOptional({
    description: 'Maximum area in square meters',
    example: 200,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxArea?: number;

  @ApiPropertyOptional({
    description: 'Availability filter',
    example: true,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  available?: boolean;

  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Sort field',
    enum: SortField,
    example: SortField.PRICE,
    default: SortField.CREATED_AT,
  })
  @IsOptional()
  @IsEnum(SortField)
  sortBy?: SortField = SortField.CREATED_AT;

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: SortOrder,
    example: SortOrder.DESC,
    default: SortOrder.DESC,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;
}
