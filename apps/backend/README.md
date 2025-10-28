# 🏠 Apartment Listing Backend

A modern, scalable NestJS REST API built with **Layered Architecture** following SOLID principles, clean code practices, and enterprise-level design patterns.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Architecture Layers](#architecture-layers)
- [Design Patterns](#design-patterns)
- [Key Benefits](#key-benefits)

## 🚀 Tech Stack

- **NestJS** - Progressive Node.js framework with TypeScript
- **TypeScript** - Type-safe development
- **Prisma** - Next-generation ORM for PostgreSQL
- **PostgreSQL** - Relational database
- **Express** - HTTP server (NestJS default)
- **Swagger/OpenAPI** - API documentation
- **class-validator** - DTO validation
- **class-transformer** - Object transformation

## 🏗️ Architecture Overview

This application follows a **Layered Architecture** (also known as N-Tier Architecture) that separates concerns into distinct layers:

```
┌─────────────────────────────────────────────────────────┐
│                 Controller Layer (API)                  │
│        HTTP Requests/Responses, Routing, Validation     │
├─────────────────────────────────────────────────────────┤
│                   Service Layer                         │
│          Business Logic, Orchestration                  │
├─────────────────────────────────────────────────────────┤
│                  Repository Layer                       │
│        Data Access, Database Operations                 │
├─────────────────────────────────────────────────────────┤
│                  Infrastructure Layer                   │
│      Utilities, Helpers, Database Connection            │
└─────────────────────────────────────────────────────────┘
```

### Architecture Benefits

- **Separation of Concerns**: Each layer has a single, well-defined responsibility
- **Testability**: Easy to unit test each layer independently with mocks
- **Maintainability**: Changes in one layer don't cascade to others
- **Scalability**: Easy to add new features following established patterns
- **Dependency Inversion**: High-level modules don't depend on low-level modules

## 📁 Project Structure

```
src/
├── main.ts                       # Application entry point
├── app.module.ts                 # Root application module
├── app.controller.ts             # Root controller
└── app.service.ts                # Root service
│
├── apartments/                   # Apartments feature module
│   ├── apartments.module.ts     # Feature module definition
│   ├── apartments.controller.ts # Controller Layer - API endpoints
│   ├── apartments.service.ts    # Service Layer - Business logic
│   ├── apartments.repository.ts # Repository Layer - Data access
│   │
│   ├── dto/                     # Data Transfer Objects
│   │   ├── create-apartment.dto.ts
│   │   ├── update-apartment.dto.ts
│   │   ├── query-apartment.dto.ts
│   │   ├── apartment-response.dto.ts
│   │   └── paginated-response.dto.ts
│   │
│   ├── entities/                # Domain entities
│   │   └── apartment.entity.ts
│   │
│   └── utils/                   # Feature-specific utilities
│       ├── filter-builder.util.ts    # Query filter builder
│       └── data-mapper.util.ts       # Data transformation
│
├── upload/                       # File upload feature module
│   ├── upload.module.ts
│   ├── upload.controller.ts
│   ├── upload.service.ts
│   └── upload.config.ts
│
├── prisma/                       # Database infrastructure
│   ├── prisma.module.ts         # Prisma module
│   └── prisma.service.ts        # Database connection service
│
└── prisma/                       # Prisma schema & migrations (root level)
    ├── schema.prisma            # Database schema definition
    ├── seed.ts                  # Database seeding
    └── migrations/              # Database migrations
```

## 🎯 Architecture Layers

### 1. Controller Layer (API/Presentation)

Located in `*.controller.ts` files, this layer:

- **Handles HTTP requests** and responses
- **Defines API routes** and endpoints
- **Validates input** using DTOs and pipes
- **Delegates business logic** to the Service layer
- **Documents API** with Swagger decorators

**Example: apartments.controller.ts**

```typescript
@ApiTags('apartments')
@Controller({ path: 'apartments', version: '1' })
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
  async create(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    createApartmentDto: CreateApartmentDto,
  ): Promise<ApartmentResponseDto> {
    // Delegate to Service layer
    return this.apartmentsService.create(createApartmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all apartments with filtering and pagination' })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: QueryApartmentDto,
  ): Promise<PaginatedApartmentsResponseDto> {
    return this.apartmentsService.findAll(query);
  }
}
```

**Responsibilities:**

- Route definition (`@Get()`, `@Post()`, `@Patch()`, `@Delete()`)
- Request validation (`@Body()`, `@Query()`, `@Param()` with `ValidationPipe`)
- Response formatting and status codes
- API documentation (`@ApiOperation()`, `@ApiResponse()`)
- No business logic - only orchestration

### 2. Service Layer (Business Logic)

Located in `*.service.ts` files, this layer:

- **Implements business logic** and rules
- **Orchestrates operations** between multiple repositories
- **Handles data transformation** between entities and DTOs
- **Manages error handling** and logging
- **Coordinates complex workflows**

**Example: apartments.service.ts**

```typescript
@Injectable()
export class ApartmentsService {
  private readonly logger = new Logger(ApartmentsService.name);

  constructor(private readonly apartmentsRepository: ApartmentsRepository) {}

  /**
   * Creates a new apartment listing.
   * Handles business validation and data transformation.
   */
  async create(
    createApartmentDto: CreateApartmentDto,
  ): Promise<ApartmentResponseDto> {
    this.logger.log('Creating new apartment');

    try {
      // Delegate data persistence to Repository layer
      const apartment =
        await this.apartmentsRepository.create(createApartmentDto);

      // Transform entity to DTO (business logic)
      return this.mapToResponseDto(apartment);
    } catch (error) {
      this.logger.error('Failed to create apartment', error.stack);
      throw new BadRequestException('Failed to create apartment');
    }
  }

  /**
   * Retrieves paginated apartments with filters.
   * Orchestrates repository calls and builds response.
   */
  async findAll(
    query: QueryApartmentDto,
  ): Promise<PaginatedApartmentsResponseDto> {
    // Business logic for pagination defaults
    const page = query.page || 1;
    const limit = query.limit || 10;

    // Delegate to Repository layer
    const { apartments, total } =
      await this.apartmentsRepository.findAll(query);

    // Build paginated response (business logic)
    return {
      data: apartments.map((apt) => this.mapToResponseDto(apt)),
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Maps entity to response DTO.
   * Encapsulates transformation logic.
   */
  private mapToResponseDto(entity: ApartmentEntity): ApartmentResponseDto {
    return {
      id: entity.id,
      unitName: entity.unitName,
      project: entity.project,
      // ... other mappings
    };
  }
}
```

**Responsibilities:**

- Business rule validation
- Data transformation (Entity ↔ DTO)
- Error handling and logging
- Orchestration of multiple repository calls
- No database queries - delegates to Repository layer

### 3. Repository Layer (Data Access)

Located in `*.repository.ts` files, this layer:

- **Abstracts database operations** using Prisma
- **Builds complex queries** with filters, pagination, sorting
- **Handles data persistence** (CRUD operations)
- **Returns domain entities**, not Prisma models
- **Isolates database logic** from business logic

**Example: apartments.repository.ts**

```typescript
@Injectable()
export class ApartmentsRepository {
  private readonly logger = new Logger(ApartmentsRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new apartment in the database.
   */
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

  /**
   * Finds all apartments with complex filtering, pagination, and sorting.
   */
  async findAll(query: QueryApartmentDto): Promise<{
    apartments: ApartmentEntity[];
    total: number;
  }> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    // Build complex where clause using utility
    const where = ApartmentFilterBuilder.buildApartmentFilters(query);

    // Build sort order
    const orderBy = ApartmentDataMapper.buildOrderBy(
      query.sortBy || SortField.CREATED_AT,
      query.sortOrder || SortOrder.DESC,
    );

    // Parallel execution for performance
    const [apartments, total] = await Promise.all([
      this.prisma.apartment.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prisma.apartment.count({ where }),
    ]);

    return {
      apartments: apartments.map((apt) => new ApartmentEntity(apt)),
      total,
    };
  }

  /**
   * Finds apartment by ID.
   */
  async findById(id: string): Promise<ApartmentEntity | null> {
    const apartment = await this.prisma.apartment.findUnique({
      where: { id },
    });

    return apartment ? new ApartmentEntity(apartment) : null;
  }

  /**
   * Updates an apartment.
   */
  async update(
    id: string,
    updateDto: UpdateApartmentDto,
  ): Promise<ApartmentEntity> {
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
}
```

**Responsibilities:**

- Database queries (Prisma operations)
- Query building (where clauses, joins, pagination)
- Data persistence (create, update, delete)
- Returns domain entities
- No business logic - only data access

### 4. Infrastructure Layer (Utilities & Helpers)

Located in `utils/`, `prisma/`, and other infrastructure folders:

#### Database Connection (`prisma/`)

```typescript
/**
 * Prisma service manages database connection lifecycle.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
```

#### Utility Services (`utils/`)

**Filter Builder** - Constructs complex Prisma where clauses:

```typescript
export class ApartmentFilterBuilder {
  /**
   * Builds Prisma where clause from query filters.
   * Supports text search, range filters, and boolean filters.
   */
  static buildApartmentFilters(
    filters: FilterInput,
  ): Prisma.ApartmentWhereInput {
    const where: Prisma.ApartmentWhereInput = {};

    // Text search across multiple fields
    if (filters.search) {
      where.OR = [
        { unitName: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { city: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    // Range filters for numeric fields
    this.addRangeFilter(where, 'price', filters.minPrice, filters.maxPrice);
    this.addRangeFilter(
      where,
      'bedrooms',
      filters.minBedrooms,
      filters.maxBedrooms,
    );

    return where;
  }
}
```

**Data Mapper** - Transforms and maps data:

```typescript
export class ApartmentDataMapper {
  /**
   * Builds update data object, only including defined fields.
   */
  static buildUpdateData(
    updateDto: UpdateApartmentDto,
  ): Partial<UpdateApartmentDto> {
    const data: Partial<UpdateApartmentDto> = {};

    // Only include fields that are defined
    if (updateDto.unitName !== undefined) data.unitName = updateDto.unitName;
    if (updateDto.price !== undefined) data.price = updateDto.price;
    // ... other fields

    return data;
  }

  /**
   * Builds Prisma sort order from query parameters.
   */
  static buildOrderBy(sortBy: SortField, sortOrder: SortOrder) {
    return { [sortBy]: sortOrder };
  }
}
```

## 🎨 Design Patterns

### 1. **Dependency Injection (DI)**

NestJS's core pattern for loose coupling:

```typescript
@Injectable()
export class ApartmentsService {
  constructor(
    private readonly apartmentsRepository: ApartmentsRepository,
    // Dependencies are injected, not created
  ) {}
}
```

**Benefits:**

- Loose coupling between classes
- Easy to mock for testing
- Improved maintainability

### 2. **Repository Pattern**

Abstracts data access logic:

```typescript
// Repository abstracts database operations
export class ApartmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryDto) {
    // Complex Prisma queries hidden from service layer
  }
}
```

**Benefits:**

- Separation of data access from business logic
- Easy to swap database implementations
- Centralized query logic

### 3. **DTO Pattern (Data Transfer Objects)**

Type-safe data validation and transformation:

```typescript
export class CreateApartmentDto {
  @IsString()
  @IsNotEmpty()
  unitName: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsArray()
  images?: string[];
}
```

**Benefits:**

- Automatic validation with class-validator
- Type safety across layers
- Clear API contracts
- Shared types with frontend via `@apartment-listing/shared`

### 4. **Entity Pattern**

Domain objects that represent business concepts:

```typescript
export class ApartmentEntity {
  id: string;
  unitName: string;
  price: number;
  // ... other properties

  constructor(data: Partial<ApartmentEntity>) {
    Object.assign(this, data);
  }

  // Can include domain methods
  isAvailable(): boolean {
    return this.available;
  }
}
```

**Benefits:**

- Encapsulates domain logic
- Provides abstraction over database models
- Can contain business methods

### 5. **Utility/Helper Pattern**

Static utility classes for reusable logic:

```typescript
export class ApartmentFilterBuilder {
  static buildApartmentFilters(filters: FilterInput) {
    // Reusable filter building logic
  }
}
```

**Benefits:**

- Reusable across multiple services/repositories
- Stateless and predictable
- Easy to test

## 🎯 Key Benefits of This Architecture

### 1. **Separation of Concerns**

Each layer has a distinct responsibility:

- Controllers handle HTTP
- Services handle business logic
- Repositories handle data access
- Utilities provide reusable helpers

### 2. **Testability**

Each layer can be tested in isolation:

- Controllers: Test routing and validation
- Services: Test business logic with mocked repositories
- Repositories: Test queries with test database
- Utilities: Test pure functions

### 3. **Maintainability**

Changes are localized:

- Database changes → Repository layer only
- Business rule changes → Service layer only
- API changes → Controller layer only

### 4. **Scalability**

Easy to add new features:

- Create new module following same pattern
- Reuse existing utilities and infrastructure
- Consistent patterns across codebase

### 5. **Type Safety**

TypeScript throughout:

- Compile-time type checking
- Shared types with frontend via monorepo
- DTO validation at runtime

### 6. **SOLID Principles**

- **S**ingle Responsibility: Each class has one reason to change
- **O**pen/Closed: Open for extension, closed for modification
- **L**iskov Substitution: Repositories can be substituted
- **I**nterface Segregation: Small, focused interfaces
- **D**ependency Inversion: Depend on abstractions (DI)

### 7. **Performance Optimizations**

- Parallel database queries (`Promise.all`)
- Efficient Prisma queries with proper indexing
- Pagination to limit data transfer
- Query optimization with proper filtering

---

This architecture enables a clean, maintainable, and scalable backend application that can grow with your project needs.

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->
