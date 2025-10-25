import { Injectable, Logger } from '@nestjs/common';

import { SortField, SortOrder } from '@apartment-listing/shared';

import { PrismaService } from '../prisma/prisma.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { QueryApartmentDto } from './dto/query-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { ApartmentEntity } from './entities/apartment.entity';
import { ApartmentDataMapper, ApartmentFilterBuilder } from './utils';

@Injectable()
export class ApartmentsRepository {
  private readonly logger = new Logger(ApartmentsRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateApartmentDto): Promise<ApartmentEntity> {
    this.logger.log(`Creating apartment: ${createDto.unitName}`);

    const apartment = await this.prisma.apartment.create({
      data: {
        ...createDto,
        images: createDto.images ?? [],
        available: createDto.available ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });

    return new ApartmentEntity(apartment);
  }

  async findAll(query: QueryApartmentDto): Promise<{
    apartments: ApartmentEntity[];
    total: number;
  }> {
    const { page = 1, limit = 10, sortBy, sortOrder, ...filters } = query;
    const skip = ApartmentDataMapper.calculateSkip(page, limit);
    const where = ApartmentFilterBuilder.buildApartmentFilters(filters);

    this.logger.log(
      `Finding apartments with filters: ${JSON.stringify(filters)}`,
    );

    const [apartments, total] = await this.prisma.$transaction([
      this.prisma.apartment.findMany({
        where,
        skip,
        take: limit,
        orderBy: ApartmentDataMapper.buildSortOrder(
          sortBy ?? SortField.CREATED_AT,
          sortOrder ?? SortOrder.DESC,
        ),
      }),
      this.prisma.apartment.count({ where }),
    ]);

    return {
      apartments: apartments.map((apt) => new ApartmentEntity(apt)),
      total,
    };
  }

  async findOne(id: string): Promise<ApartmentEntity | null> {
    this.logger.log(`Finding apartment with id: ${id}`);

    const apartment = await this.prisma.apartment.findUnique({
      where: { id },
    });

    return apartment ? new ApartmentEntity(apartment) : null;
  }

  async update(
    id: string,
    updateDto: UpdateApartmentDto,
  ): Promise<ApartmentEntity> {
    this.logger.log(`Updating apartment with id: ${id}`);

    const data = ApartmentDataMapper.buildUpdateData(updateDto);
    const apartment = await this.prisma.apartment.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date().toISOString(),
      },
    });

    return new ApartmentEntity(apartment);
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing apartment with id: ${id}`);

    await this.prisma.apartment.delete({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.apartment.count({
      where: { id },
    });

    return count > 0;
  }
}
