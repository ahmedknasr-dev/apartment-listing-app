import { ApiProperty } from '@nestjs/swagger';

import { ApartmentResponseDto } from './apartment-response.dto';

export class PaginationMetaDto {
  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  currentPage = 1;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  itemsPerPage = 10;

  @ApiProperty({
    description: 'Total number of items',
    example: 50,
  })
  totalItems = 0;

  @ApiProperty({
    description: 'Total number of pages',
    example: 5,
  })
  totalPages = 0;

  @ApiProperty({
    description: 'Whether there is a next page',
    example: true,
  })
  hasNextPage = false;

  @ApiProperty({
    description: 'Whether there is a previous page',
    example: false,
  })
  hasPreviousPage = false;
}

export class PaginatedApartmentsResponseDto {
  @ApiProperty({
    description: 'Array of apartments',
    type: [ApartmentResponseDto],
  })
  data: ApartmentResponseDto[] = [];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto = new PaginationMetaDto();
}
