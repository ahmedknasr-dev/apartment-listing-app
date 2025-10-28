import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApartmentsService } from './apartments.service';
import {
  ApartmentResponseDto,
  CreateApartmentDto,
  PaginatedApartmentsResponseDto,
  QueryApartmentDto,
  UpdateApartmentDto,
} from './dto';

@ApiTags('apartments')
@Controller({
  path: 'apartments',
  version: '1',
})
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new apartment' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Apartment successfully created',
    type: ApartmentResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async create(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    createApartmentDto: CreateApartmentDto,
  ): Promise<ApartmentResponseDto> {
    return this.apartmentsService.create(createApartmentDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all apartments with filtering and pagination' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of apartments',
    type: PaginatedApartmentsResponseDto,
  })
  async findAll(
    @Query(new ValidationPipe({ whitelist: true, transform: true }))
    query: QueryApartmentDto,
  ): Promise<PaginatedApartmentsResponseDto> {
    return this.apartmentsService.findAll(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get apartment by ID' })
  @ApiParam({
    name: 'id',
    description: 'Apartment UUID',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Apartment found',
    type: ApartmentResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Apartment not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid UUID format',
  })
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ApartmentResponseDto> {
    return this.apartmentsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update apartment by ID' })
  @ApiParam({
    name: 'id',
    description: 'Apartment UUID',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Apartment successfully updated',
    type: ApartmentResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Apartment not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data or UUID format',
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    updateApartmentDto: UpdateApartmentDto,
  ): Promise<ApartmentResponseDto> {
    return this.apartmentsService.update(id, updateApartmentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete apartment by ID' })
  @ApiParam({
    name: 'id',
    description: 'Apartment UUID',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Apartment successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Apartment not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid UUID format',
  })
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.apartmentsService.remove(id);
  }
}
