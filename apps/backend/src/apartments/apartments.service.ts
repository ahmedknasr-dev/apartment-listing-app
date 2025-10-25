import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { ApartmentsRepository } from './apartments.repository';
import {
  ApartmentResponseDto,
  CreateApartmentDto,
  PaginatedApartmentsResponseDto,
  QueryApartmentDto,
  UpdateApartmentDto,
} from './dto';
import { ApartmentEntity } from './entities/apartment.entity';

/**
 * Service for managing apartment business logic.
 * Handles apartment CRUD operations and data transformation.
 */
@Injectable()
export class ApartmentsService {
  private readonly logger = new Logger(ApartmentsService.name);

  constructor(private readonly apartmentsRepository: ApartmentsRepository) {}

  /**
   * Creates a new apartment listing.
   * @param createApartmentDto - The apartment data to create
   * @returns The created apartment response DTO
   * @throws BadRequestException if creation fails
   */
  async create(
    createApartmentDto: CreateApartmentDto,
  ): Promise<ApartmentResponseDto> {
    this.logger.log('Creating new apartment');

    try {
      const apartment =
        await this.apartmentsRepository.create(createApartmentDto);
      return this.mapToResponseDto(apartment);
    } catch (error) {
      this.logger.error(
        'Failed to create apartment',
        error instanceof Error ? error.stack : String(error),
      );
      throw new BadRequestException('Failed to create apartment');
    }
  }

  /**
   * Retrieves a paginated list of apartments based on query filters.
   * @param query - Query parameters including filters, pagination, and sorting
   * @returns Paginated apartment response with metadata
   */
  async findAll(
    query: QueryApartmentDto,
  ): Promise<PaginatedApartmentsResponseDto> {
    this.logger.log('Fetching apartments with filters');

    const { apartments, total } =
      await this.apartmentsRepository.findAll(query);

    const { page = 1, limit = 10 } = query;
    const totalPages = Math.ceil(total / limit);

    return {
      data: apartments.map((apt) => this.mapToResponseDto(apt)),
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  /**
   * Retrieves a single apartment by its ID.
   * @param id - The unique identifier of the apartment
   * @returns The apartment response DTO
   * @throws NotFoundException if apartment is not found
   */
  async findOne(id: string): Promise<ApartmentResponseDto> {
    this.logger.log(`Fetching apartment with id: ${id}`);

    const apartment = await this.apartmentsRepository.findOne(id);

    if (!apartment) {
      throw new NotFoundException(`Apartment with ID "${id}" not found`);
    }

    return this.mapToResponseDto(apartment);
  }

  /**
   * Updates an existing apartment with the provided data.
   * @param id - The unique identifier of the apartment to update
   * @param updateApartmentDto - The partial apartment data to update
   * @returns The updated apartment response DTO
   * @throws NotFoundException if apartment is not found
   * @throws BadRequestException if update fails
   */
  async update(
    id: string,
    updateApartmentDto: UpdateApartmentDto,
  ): Promise<ApartmentResponseDto> {
    this.logger.log(`Updating apartment with id: ${id}`);

    const exists = await this.apartmentsRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Apartment with ID "${id}" not found`);
    }

    try {
      const apartment = await this.apartmentsRepository.update(
        id,
        updateApartmentDto,
      );
      return this.mapToResponseDto(apartment);
    } catch (error) {
      this.logger.error(
        'Failed to update apartment',
        error instanceof Error ? error.stack : String(error),
      );
      throw new BadRequestException('Failed to update apartment');
    }
  }

  /**
   * Removes an apartment from the system.
   * @param id - The unique identifier of the apartment to remove
   * @throws NotFoundException if apartment is not found
   * @throws BadRequestException if removal fails
   */
  async remove(id: string): Promise<void> {
    this.logger.log(`Removing apartment with id: ${id}`);

    const exists = await this.apartmentsRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Apartment with ID "${id}" not found`);
    }

    try {
      await this.apartmentsRepository.remove(id);
    } catch (error) {
      this.logger.error(
        'Failed to remove apartment',
        error instanceof Error ? error.stack : String(error),
      );
      throw new BadRequestException('Failed to remove apartment');
    }
  }

  /**
   * Maps an ApartmentEntity to an ApartmentResponseDto.
   * @param apartment - The apartment entity to map
   * @returns The mapped apartment response DTO
   */
  private mapToResponseDto(apartment: ApartmentEntity): ApartmentResponseDto {
    return {
      id: apartment.id,
      unitName: apartment.unitName,
      unitNumber: apartment.unitNumber,
      project: apartment.project,
      description: apartment.description,
      address: apartment.address,
      city: apartment.city,
      price: apartment.price,
      bedrooms: apartment.bedrooms,
      bathrooms: apartment.bathrooms,
      area: apartment.area,
      images: apartment.images,
      available: apartment.available,
      createdAt: apartment.createdAt,
      updatedAt: apartment.updatedAt,
    };
  }
}
