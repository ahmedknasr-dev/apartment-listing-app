# 🏠 Apartment Listing Frontend

A modern, scalable Next.js application built with a **Three-Layered Architecture** following clean code principles and enterprise-level design patterns.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Architecture Layers](#architecture-layers)
- [State Management](#state-management)
- [Key Benefits](#key-benefits)

## 🚀 Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Bootstrap 5** & **React Bootstrap** - UI framework and components
- **TanStack Query (React Query)** - Server state management
- **Context API + useReducer** - Client state management
- **Axios** - HTTP client
- **SCSS** - Styling with CSS preprocessor

## 🏗️ Architecture Overview

This application follows a **Three-Layered Architecture** that separates concerns and promotes maintainability:

```
+----------------------------------------------------------------------+
|                        UI LAYER (Presentation)                       |
|                                                                      |
|  +---------------------+        +---------------------+             |
|  |  Smart Components   |        |  Dumb Components    |             |
|  |   (Container)       |   +--->|   (Presentational)  |             |
|  |                     |   |    |                     |             |
|  | - ApartmentList     |   |    | - ApartmentCard     |             |
|  | - ApartmentForm     |---+    | - SearchBar         |             |
|  | - ImageUpload       |        | - Pagination        |             |
|  |                     |        | - Navbar            |             |
|  +----------+----------+        +---------------------+             |
|             |                                                        |
|             | Uses Facade Hooks                                      |
+-------------+--------------------------------------------------------+
              |
              v
+----------------------------------------------------------------------+
|                       FACADE LAYER (Business Logic)                  |
|                                                                      |
|  +--------------------+  +--------------------+                     |
|  |  Business Hooks    |  |  State Management  |                     |
|  |                    |  |                    |                     |
|  | - useFetchApts     |  | - Context API      |                     |
|  | - useCreateApt     |  | - useReducer       |                     |
|  | - useUpdateApt     |  | - Actions/Dispatch |                     |
|  | - useDeleteApt     |  |                    |                     |
|  | - useUploadImages  |  |                    |                     |
|  +----------+---------+  +--------------------+                     |
|             |                                                        |
|             | Calls Core APIs                                        |
+-------------+--------------------------------------------------------+
              |
              v
+----------------------------------------------------------------------+
|                        CORE LAYER (Infrastructure)                   |
|                                                                      |
|  +--------------+  +--------------+  +--------------+               |
|  |  API Clients |  |  Utilities   |  | Custom Hooks |               |
|  |              |  |              |  |              |               |
|  | - apartments |  | - formatters |  | - useDebounce|               |
|  |   API        |  | - validators |  | - useLocal   |               |
|  | - upload API |  | - helpers    |  |   Storage    |               |
|  | - axios      |  | - constants  |  |              |               |
|  +------+-------+  +--------------+  +--------------+               |
|         |                                                            |
|         | HTTP Requests                                              |
+---------|------------------------------------------------------------+
          |
          v
    +-------------+
    |   Backend   |
    |   API       |
    |  (NestJS)   |
    +-------------+
```

### Data Flow Example

```
User Interaction --> Smart Component --> Facade Hook --> API Client --> Backend
                                                                          |
                    +-----------------------------------------------------+
                    |
                    v
Smart Component <-- State Update (Context) <-- Facade Hook <-- Response
                    |
                    v
                Dumb Components (Re-render with new props)
```

### Architecture Benefits

- **Separation of Concerns**: Each layer has a single, well-defined responsibility
- **Testability**: Easy to unit test each layer independently
- **Reusability**: Components and logic can be reused across the application
- **Maintainability**: Changes in one layer don't cascade to others
- **Scalability**: Easy to add new features without affecting existing code

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── globals.scss             # Global styles
│   └── (pages)/                 # Route groups
│       ├── page.tsx             # Home page
│       ├── apartments/          # Apartments listing page
│       └── dashboard/           # Dashboard page
│
├── components/                   # UI Layer (Presentation)
│   ├── dashboard/               # Smart Components (Container Components)
│   │   ├── ApartmentCard/       # Feature-specific smart components
│   │   ├── ApartmentForm/
│   │   ├── ApartmentList/
│   │   ├── ApartmentModal/
│   │   ├── DeleteConfirmModal/
│   │   └── ImageUpload/
│   │
│   └── shared/                  # Dumb Components (Presentational Components)
│       ├── ApartmentCard/       # Reusable presentational components
│       ├── Navbar/
│       ├── Pagination/
│       └── SearchBar/
│
├── facade/                       # Facade Layer (Business Logic)
│   ├── apartmentFacade.ts       # Apartment business logic hooks
│   └── uploadFacade.ts          # Upload business logic hooks
│
├── lib/                          # Core Layer (Infrastructure)
│   ├── api/                     # API clients and services
│   │   ├── client.ts            # Axios instance configuration
│   │   ├── apartments.api.ts    # Apartments API endpoints
│   │   └── upload.api.ts        # Upload API endpoints
│   │
│   ├── hooks/                   # Reusable custom hooks
│   └── utils/                   # Utility functions
│
├── store/                        # State Management
│   ├── ApartmentContext.tsx     # Context provider
│   ├── apartmentReducer.ts      # State reducer
│   └── apartmentActions.ts      # Action types
│
├── providers/                    # App-wide providers
│   └── Providers.tsx            # React Query & Context providers
│
└── styles/                       # Global styles
    ├── _variables.scss          # SCSS variables
    ├── _bootstrap-overrides.scss # Bootstrap customization
    └── bootstrap-custom.scss     # Custom Bootstrap build
```

## Architecture Layers

### 1. UI Layer (Presentation)

The presentation layer consists of React components divided into two categories:

#### Smart Components (Container Components)

Located in `components/dashboard/`, these components:

- **Handle business logic** through facade hooks
- **Manage local component state** (UI state)
- **Orchestrate data flow** between facade and dumb components
- **Handle user interactions** and events
- **Compose multiple dumb components**

**Example: ApartmentList**

```typescript
// Smart component that orchestrates data fetching and rendering
const ApartmentList = () => {
  const fetchApartments = useFetchApartments(); // Facade hook
  const [filters, setFilters] = useState({});

  // Business logic orchestration
  useEffect(() => {
    fetchApartments(filters);
  }, [filters]);

  return (
    <>
      <SearchBar onSearch={setFilters} />  {/* Dumb component */}
      <ApartmentCard data={apartments} />   {/* Dumb component */}
      <Pagination meta={meta} />            {/* Dumb component */}
    </>
  );
};
```

#### Dumb Components (Presentational Components)

Located in `components/shared/`, these components:

- **Receive data via props** only
- **Emit events** through callback props
- **No business logic** - purely presentational
- **Highly reusable** across different contexts
- **Stateless** (or only UI-related state like hover, focus)

**Example: ApartmentCard**

```typescript
// Dumb component that only renders what it receives
interface ApartmentCardProps {
  apartment: ApartmentResponseDto;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({
  apartment,
  onEdit,
  onDelete
}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{apartment.unitName}</Card.Title>
        <Card.Text>{apartment.description}</Card.Text>
        <Button onClick={() => onEdit?.(apartment.id)}>Edit</Button>
        <Button onClick={() => onDelete?.(apartment.id)}>Delete</Button>
      </Card.Body>
    </Card>
  );
};
```

### 2. Facade Layer (Business Logic)

Located in `facade/`, this layer acts as an intermediary between UI and Core layers:

- **Exposes custom hooks** that encapsulate business logic
- **Orchestrates API calls** from the Core layer
- **Manages state updates** through Context/Reducers
- **Handles error scenarios** and loading states
- **Provides clean API** to UI components

**Example: apartmentFacade.ts**

```typescript
/**
 * Hook for fetching apartments with built-in state management
 */
export const useFetchApartments = () => {
  const { dispatch } = useApartmentContext();

  return useCallback(
    async (query?: ListApartmentsQueryDto) => {
      try {
        dispatch({ type: ApartmentActionType.SET_LOADING, payload: true });

        // Core layer API call
        const response = await apartmentsApi.getAll(query);

        // State orchestration
        dispatch({ type: ApartmentActionType.SET_APARTMENTS, payload: response.data });
        dispatch({ type: ApartmentActionType.SET_PAGINATION, payload: response.meta });

        return response;
      } catch (error) {
        dispatch({ type: ApartmentActionType.SET_ERROR, payload: errorMessage });
        toastUtils.error(errorMessage);
        throw error;
      } finally {
        dispatch({ type: ApartmentActionType.SET_LOADING, payload: false });
      }
    },
    [dispatch],
  );
};
```

### 3. Core Layer (Infrastructure)

Located in `lib/`, this layer provides foundational services:

#### API Clients (`lib/api/`)

- **HTTP client configuration** (Axios instance)
- **API endpoint definitions**
- **Request/response interceptors**
- **Type-safe API methods**

**Example: apartments.api.ts**

```typescript
export const apartmentsApi = {
  getAll: async (query?: ListApartmentsQueryDto): Promise<PaginatedApartmentsDto> => {
    const response = await apiClient.get('/apartments', { params: query });
    return response.data;
  },

  getById: async (id: string): Promise<ApartmentResponseDto> => {
    const response = await apiClient.get(`/apartments/${id}`);
    return response.data;
  },

  create: async (data: CreateApartmentDto): Promise<ApartmentResponseDto> => {
    const response = await apiClient.post('/apartments', data);
    return response.data;
  },
};
```

#### Utilities (`lib/utils/`)

- **Helper functions**
- **Formatters and validators**
- **Constants and configurations**

#### Custom Hooks (`lib/hooks/`)

- **Reusable UI hooks** (not business logic)
- **Browser API abstractions**
- **Generic state management hooks**

## 🔄 State Management

The application uses a **hybrid state management approach**:

### Global State (Context + useReducer)

For complex, application-wide state like apartments list:

```typescript
// State structure
interface ApartmentState {
  apartments: ApartmentResponseDto[];
  selectedApartment: ApartmentResponseDto | null;
  filters: ListApartmentsQueryDto;
  pagination: PaginationMeta;
  loading: boolean;
  error: string | null;
}

// Usage in components
const { state, dispatch } = useApartmentContext();
```

### Server State (TanStack Query)

For server data caching and synchronization:

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['apartments', filters],
  queryFn: () => apartmentsApi.getAll(filters),
});
```

### Local State (useState)

For component-specific UI state:

```typescript
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedTab, setSelectedTab] = useState('details');
```

## 🎯 Key Benefits of This Architecture

### 1. **Separation of Concerns**

Each layer has a distinct responsibility, making the codebase easier to understand and navigate:

- UI Layer focuses on presentation
- Facade Layer handles business logic
- Core Layer manages data access and utilities

### 2. **Testability**

Each layer can be tested in isolation:

- Dumb components can be tested with simple prop variations
- Facade hooks can be tested with mocked API responses
- API clients can be tested independently

### 3. **Reusability**

- Dumb components are highly reusable across different features
- Facade hooks encapsulate reusable business logic
- Core utilities and API clients are shared across the application

### 4. **Maintainability**

Changes are localized to specific layers:

- UI changes don't affect business logic
- Business logic changes don't affect the API layer
- API changes are isolated in the Core layer

### 5. **Scalability**

Adding new features follows established patterns:

- New API endpoints go in `lib/api/`
- New business logic becomes a facade hook
- New UI features compose existing dumb components

### 6. **Type Safety**

TypeScript types flow through all layers from the shared package (`@apartment-listing/shared`), ensuring consistency between frontend and backend.

---

This architecture enables a clean, maintainable, and scalable frontend application that can grow with your project needs.
