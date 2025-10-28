# 🏠 Apartment Listing Application

A modern, full-stack apartment listing platform built with enterprise-level architecture and best practices. This monorepo application features a NestJS REST API backend, Next.js frontend, and shared type definitions for end-to-end type safety.

---

## 🚀 Quick Start with Docker

Get the entire application running with a single command!

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose installed
- That's it! No need for Node.js, pnpm, or PostgreSQL locally

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/ahmedknasr-dev/apartment-listing-app.git
   cd apartment-listing-app
   ```

2. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   > 💡 The default values in `.env.example` are pre-configured for Docker. You can use them as-is or customize as needed.

3. **Start the application**

   ```bash
   docker compose up -d
   ```

   This single command will:
   - 🗄️ Start PostgreSQL database
   - 🚀 Build and run the NestJS backend (Port 3001)
   - 🎨 Build and run the Next.js frontend (Port 3000)
   - 📊 Run database migrations automatically
   - 🌱 Seed the database with sample data

4. **Access the application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:3001
   - **API Documentation**: http://localhost:3001/docs (Swagger UI)

5. **Stop the application**
   ```bash
   docker compose down
   ```

That's it! Your full-stack apartment listing application is now running. 🎉

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Development Without Docker](#-development-without-docker)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Documentation](#-documentation)

## ✨ Features

### 🏢 Apartment Management

- **CRUD Operations**: Create, read, update, and delete apartment listings
- **Image Upload**: Multi-image upload support for apartment photos
- **Rich Details**: Comprehensive apartment information including:
  - Unit name and description
  - Project and location details
  - Price, bedrooms, bathrooms, area
  - Availability status
  - Multiple images

### 🔍 Advanced Search & Filtering

- **Full-text Search**: Search across unit names, descriptions, addresses, cities, and projects
- **Range Filters**: Filter by price, bedrooms, bathrooms, and area (min/max)
- **Location Filters**: Filter by city and project
- **Availability Filter**: Show only available or unavailable units
- **Sorting**: Sort by any field (price, date, area, etc.) in ascending or descending order

### 📄 Pagination

- Efficient data loading with customizable page size
- Pagination metadata (total items, total pages, current page)

### 🎨 Modern UI

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Bootstrap 5**: Professional, clean interface with React Bootstrap components
- **Interactive Dashboard**: Easy-to-use interface for managing listings
- **Real-time Validation**: Form validation with immediate feedback

### 🔒 Type Safety

- **End-to-End Type Safety**: Shared TypeScript types between backend and frontend
- **Runtime Validation**: DTO validation with class-validator
- **Compile-time Checks**: TypeScript ensures type correctness across the entire stack

## 🚀 Tech Stack

### Frontend (`apps/frontend`)

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Bootstrap 5](https://getbootstrap.com/)** & **[React Bootstrap](https://react-bootstrap.github.io/)** - UI framework
- **[TanStack Query](https://tanstack.com/query)** - Server state management
- **[Axios](https://axios-http.com/)** - HTTP client
- **Context API + useReducer** - Client state management
- **SCSS** - Advanced styling

**Architecture**: Three-Layered Architecture (UI, Facade, Core)

👉 [**View Frontend Architecture Details**](./apps/frontend/README.md)

### Backend (`apps/backend`)

- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[Swagger/OpenAPI](https://swagger.io/)** - API documentation
- **[class-validator](https://github.com/typestack/class-validator)** - DTO validation
- **[class-transformer](https://github.com/typestack/class-transformer)** - Object transformation
- **Express** - HTTP server

**Architecture**: Layered Architecture (Controller, Service, Repository, Infrastructure)

👉 [**View Backend Architecture Details**](./apps/backend/README.md)

### Shared Package (`packages/shared`)

- **Shared TypeScript Types**: Common interfaces and types
- **DTOs**: Data Transfer Objects used by both frontend and backend
- **Enums**: Shared enumerations (sort fields, sort order, numeric fields)
- **Type Definitions**: Consistent type definitions across the monorepo

### DevOps & Infrastructure

- **[Docker](https://www.docker.com/)** & **Docker Compose** - Containerization
- **[pnpm](https://pnpm.io/)** - Fast, efficient package manager
- **[pnpm Workspaces](https://pnpm.io/workspaces)** - Monorepo management
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[lint-staged](https://github.com/okonet/lint-staged)** - Pre-commit linting
- **[commitlint](https://commitlint.js.org/)** - Conventional commits
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

## 🏗️ Architecture

This project follows modern architectural patterns with clear separation of concerns:

### Monorepo Structure

```
                    apartment-listing-app (monorepo)
                              │
                    ┌─────────┴─────────┐
                    │  pnpm workspace   │
                    └─────────┬─────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│   Frontend    │     │   Backend     │     │    Shared     │
│   (Next.js)   │────▶│   (NestJS)    │◀────│  (Types/DTOs) │
│               │     │               │     │               │
│ • React 19    │     │ • PostgreSQL  │     │ • Interfaces  │
│ • TypeScript  │     │ • Prisma ORM  │     │ • Enums       │
│ • Bootstrap   │     │ • TypeScript  │     │ • DTOs        │
└───────┬───────┘     └───────┬───────┘     └───────┬───────┘
        │                     │                     │
        └─────────────────────┴─────────────────────┘
                              │
                   Shared Type Definitions
            (Compile-time type safety across stack)
```

### Data Flow

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Browser   │  HTTP   │   Backend   │  SQL    │  PostgreSQL │
│  (Next.js)  │◀───────▶│  (NestJS)   │◀───────▶│  Database   │
└─────────────┘         └─────────────┘         └─────────────┘
       │                       │
       │    Types from         │
       └───► @apartment-listing/shared ◄────┘
             (Single source of truth)
```

### Key Architectural Benefits

1. **🔗 Monorepo Architecture**
   - Single source of truth for all code
   - Shared dependencies and configurations
   - Atomic commits across frontend and backend
   - Easy refactoring and code sharing

2. **📦 Shared Type Package**
   - Single definition of data structures
   - Compile-time type safety across the stack
   - Automatic type checking between frontend and backend
   - No type mismatches or runtime errors

3. **🎯 Layered Backend** (Controller → Service → Repository)
   - Clear separation of concerns
   - Easy to test and maintain
   - Follows SOLID principles
   - Repository pattern for data access

4. **🎨 Three-Layered Frontend** (UI → Facade → Core)
   - Smart and dumb components
   - Business logic in facade layer
   - Reusable components and utilities
   - Clean code organization

## 📁 Project Structure

```
apartment-listing-app/
├── apps/
│   ├── backend/                 # NestJS Backend Application
│   │   ├── src/
│   │   │   ├── apartments/     # Apartments feature module
│   │   │   │   ├── apartments.controller.ts
│   │   │   │   ├── apartments.service.ts
│   │   │   │   ├── apartments.repository.ts
│   │   │   │   ├── dto/        # Data Transfer Objects
│   │   │   │   ├── entities/   # Domain entities
│   │   │   │   └── utils/      # Utilities (filters, mappers)
│   │   │   ├── upload/         # File upload module
│   │   │   ├── prisma/         # Prisma service
│   │   │   └── main.ts
│   │   ├── prisma/
│   │   │   ├── schema.prisma   # Database schema
│   │   │   ├── migrations/     # Database migrations
│   │   │   └── seed.ts         # Database seeding
│   │   ├── Dockerfile
│   │   └── README.md           # Backend architecture docs
│   │
│   └── frontend/                # Next.js Frontend Application
│       ├── src/
│       │   ├── app/            # Next.js App Router pages
│       │   ├── components/     # UI Components
│       │   │   ├── dashboard/  # Smart components
│       │   │   └── shared/     # Dumb components
│       │   ├── facade/         # Business logic layer
│       │   ├── lib/            # Core layer (API, hooks, utils)
│       │   ├── store/          # State management
│       │   ├── providers/      # Context providers
│       │   └── styles/         # SCSS styles
│       ├── Dockerfile
│       └── README.md           # Frontend architecture docs
│
├── packages/
│   └── shared/                  # Shared Types Package
│       ├── src/
│       │   ├── dto/            # Shared DTOs
│       │   ├── enums/          # Shared enums
│       │   └── types/          # Shared type definitions
│       └── package.json
│
├── docker-compose.yml          # Docker orchestration
├── pnpm-workspace.yaml         # Workspace configuration
├── .env.example                # Environment variables template
├── tsconfig.json               # Root TypeScript config
└── package.json                # Root package.json
```

## 🔐 Environment Variables

### Root `.env` (for Docker)

```bash
# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=apartment_listing
POSTGRES_PORT=5432

# Backend Configuration
BACKEND_PORT=3001

# Frontend Configuration
FRONTEND_PORT=3000

# Seeding Configuration
SKIP_SEED=false  # Set to "true" to skip database seeding
```

### Backend-specific `.env`

```bash
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/apartment_listing?schema=public
```

### Frontend-specific `.env.local`

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📚 Documentation

### Architecture Documentation

- **[Frontend Architecture](./apps/frontend/README.md)** - Three-Layered Architecture (UI, Facade, Core)
  - Smart vs Dumb components
  - State management patterns
  - Component organization
- **[Backend Architecture](./apps/backend/README.md)** - Layered Architecture (Controller, Service, Repository)
  - Layer responsibilities
  - Design patterns (DI, Repository, DTO, Entity)
  - SOLID principles

### API Documentation

- **Swagger UI**: http://localhost:3001/docs (when backend is running)
- Interactive API documentation with all endpoints, request/response schemas, and examples

## 🎯 Key Features of This Monorepo

### 1. **Type Safety Across the Stack**

```typescript
// Defined once in packages/shared
export interface ApartmentResponseDto {
  id: string;
  unitName: string;
  price: number;
  // ...
}

// Used in backend
async create(dto: CreateApartmentDto): Promise<ApartmentResponseDto> {
  // TypeScript ensures type safety
}

// Used in frontend
const apartment: ApartmentResponseDto = await apartmentsApi.getById(id);
// Auto-complete and type checking work perfectly
```

### 2. **Consistent Code Quality**

- **Pre-commit hooks**: Automatically lint and format code before commits
- **Conventional commits**: Enforced commit message format
- **TypeScript**: Strict type checking across all packages
- **ESLint & Prettier**: Consistent code style

### 3. **Docker-First Development**

- One command to start everything
- Consistent environment across team members
- No "works on my machine" issues
- Production-like setup in development

### 4. **Clean Architecture**

- Each layer has a single responsibility
- Easy to test and maintain
- Scalable and extensible
- Well-documented patterns

---
