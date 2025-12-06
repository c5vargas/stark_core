# Architecture Overview

This document provides a comprehensive overview of Stark Core's architecture, design patterns, and system organization.

## Table of Contents

- [System Architecture](#system-architecture)
- [Backend Architecture](#backend-architecture)
- [Frontend Architecture](#frontend-architecture)
- [Design Patterns](#design-patterns)
- [Data Flow](#data-flow)
- [Authentication & Authorization](#authentication--authorization)
- [Database Design](#database-design)
- [API Architecture](#api-architecture)

## System Architecture

Stark Core is a full-stack web application built with a **separated frontend-backend architecture**:

```
┌─────────────────────────────────────────────────────────┐
│                    Client Browser                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │           React SPA (Single Page App)             │  │
│  │  - React 19 + TypeScript                          │  │
│  │  - Vite Build Tool                                │  │
│  │  - Tailwind CSS                                   │  │
│  └────────────────────┬──────────────────────────────┘  │
└────────────────────────┼────────────────────────────────┘
                         │ HTTP/JSON API
                         │ (REST + Sanctum Auth)
┌────────────────────────┼────────────────────────────────┐
│  ┌────────────────────▼──────────────────────────────┐  │
│  │            Laravel Backend API                    │  │
│  │  - PHP 8.3+                                       │  │
│  │  - Laravel 12.x                                   │  │
│  │  - Repository Pattern                             │  │
│  └────────────────────┬──────────────────────────────┘  │
│                       │                                  │
│  ┌────────────────────▼──────────────────────────────┐  │
│  │         MySQL/PostgreSQL Database                 │  │
│  └───────────────────────────────────────────────────┘  │
│                    Server                                │
└─────────────────────────────────────────────────────────┘
```

### Key Characteristics

- **Separation of Concerns**: Clear boundary between frontend and backend
- **RESTful API**: JSON-based API communication
- **Token-based Authentication**: Laravel Sanctum for stateless auth
- **Modular Design**: Both frontend and backend use modular architectures
- **Type Safety**: TypeScript on frontend, type-hinted PHP on backend

## Backend Architecture

The backend follows **Laravel's MVC pattern** enhanced with the **Repository Pattern**:

```
┌────────────────────────────────────────────────────┐
│                   HTTP Request                      │
└───────────────────────┬────────────────────────────┘
                        │
┌───────────────────────▼────────────────────────────┐
│                   Middleware                        │
│  - Authentication (Sanctum)                        │
│  - Locale Application                              │
│  - CORS, etc.                                      │
└───────────────────────┬────────────────────────────┘
                        │
┌───────────────────────▼────────────────────────────┐
│                   Controller                        │
│  - Receives Request                                │
│  - Coordinates Flow                                │
│  - Returns Response                                │
└─────┬──────────────────────────────────────┬───────┘
      │                                      │
      │ validates                            │ formats
      ▼                                      ▼
┌─────────────┐                      ┌──────────────┐
│   Request   │                      │ Transformer  │
│ Validation  │                      │  (Fractal)   │
└─────────────┘                      └──────────────┘
      │
      │ authorized & validated
      ▼
┌───────────────────────────────────────────────────┐
│                   Repository                      │
│  - Abstracts Data Access                         │
│  - CRUD Operations                               │
│  - Query Building                                │
└───────────────────────┬───────────────────────────┘
                        │
┌───────────────────────▼───────────────────────────┐
│               Eloquent Model                      │
│  - Database Representation                        │
│  - Relationships                                  │
│  - Business Logic                                 │
└───────────────────────┬───────────────────────────┘
                        │
┌───────────────────────▼───────────────────────────┐
│                   Database                        │
└───────────────────────────────────────────────────┘
```

### Layer Responsibilities

#### 1. Routes (`routes/api.php`)
- Define API endpoints
- Group related routes
- Apply middleware
- Map URLs to controller methods

#### 2. Middleware (`app/Http/Middleware/`)
- Authentication checks
- Locale application
- Request preprocessing
- Security controls

#### 3. Controllers (`app/Http/Controllers/`)
- Thin layer - coordination only
- Inject dependencies (Transformer, Repository)
- Delegate to repositories
- Use base controller response methods

#### 4. Request Validation (`app/Http/Requests/`)
- Validate incoming data
- Authorization logic
- Custom validation rules
- Error messages

#### 5. Repositories (`app/Repositories/`)
- Data access abstraction
- CRUD operations
- Complex queries
- Database interaction layer

#### 6. Models (`app/Models/`)
- Eloquent ORM models
- Database relationships
- Accessors/Mutators
- Business logic methods

#### 7. Transformers (`app/Http/Transformers/`)
- Format API responses
- Control data exposure
- Consistent response structure
- Data transformation

#### 8. Services (`app/Services/`)
- Complex business logic
- External API integrations
- Multi-model operations
- Reusable logic

## Frontend Architecture

The frontend uses a **Context-Based Modular Architecture**:

```
┌─────────────────────────────────────────────────────┐
│                   App Component                      │
│  - QueryClientProvider (React Query)                │
│  - AlertProvider (Global notifications)             │
│  - i18n Provider (Internationalization)             │
└───────────────────────┬─────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────┐
│                   Router                            │
│  - React Router DOM v7                             │
│  - Route Guards (RequireAuth)                      │
│  - Lazy Loading                                    │
└───────────────────────┬─────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
┌───────▼───────┐ ┌───▼────────┐ ┌───▼──────────┐
│ Auth Context  │ │   User     │ │  Settings    │
│               │ │  Context   │ │   Context    │
└───────────────┘ └────────────┘ └──────────────┘
```

### Context Structure

Each context is a self-contained feature module:

```
context/[feature]/
├── pages/           # Route-level components
│   └── UsersPage.tsx
├── components/      # Feature-specific components
│   └── UserCard.tsx
├── hooks/           # Custom hooks
│   └── useUsers.ts
├── actions/         # API calls
│   └── getUsers.ts
├── stores/          # Zustand stores
│   └── userStore.ts
├── libs/            # Types & utilities
│   ├── types.ts
│   └── utils/
└── router/          # Route configuration
    └── index.tsx
```

### Layer Responsibilities

#### 1. Pages
- Full-page components
- Route entry points
- Layout composition
- Page-level state

#### 2. Components
- Reusable UI components
- Feature-specific components
- Presentational logic only
- Props-based API

#### 3. Hooks
- Encapsulate business logic
- Data fetching with React Query
- Reusable stateful logic
- Side effect management

#### 4. Actions
- API communication
- HTTP requests via axios
- Error handling
- Request/response transformation

#### 5. Stores (Zustand)
- Global state management
- Cross-component state
- Async actions
- State persistence

#### 6. Router
- Route definitions
- Route guards
- Lazy loading configuration
- Navigation structure

## Design Patterns

### Backend Patterns

#### 1. Repository Pattern
**Purpose**: Abstract data access logic from business logic

```php
// Interface
interface UserRepositoryInterface {
    public function find(int $id): ?Model;
    public function create(array $data): Model;
}

// Implementation
class UserRepository extends BaseRepository implements UserRepositoryInterface {
    protected $model;
    
    public function __construct(User $model) {
        $this->model = $model;
    }
}

// Usage in Controller
class UserController extends Controller {
    public function __construct(
        UserRepository $repository,
        UserTransformer $transformer
    ) {
        $this->repository = $repository;
        parent::__construct($transformer);
    }
}
```

**Benefits**:
- Testability (easy to mock)
- Flexibility (swap implementations)
- Reusability (shared queries)
- Maintainability (single source of truth)

#### 2. Transformer Pattern (Fractal)
**Purpose**: Consistent API response formatting

```php
class UserTransformer extends TransformerAbstract {
    public function transform(User $user) {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            // ... controlled data exposure
        ];
    }
}
```

#### 3. Request Validation Pattern
**Purpose**: Separate validation and authorization logic

```php
class CreateUserRequest extends FormRequest {
    public function authorize(): bool {
        return auth()->check() && auth()->user()->can('create.users');
    }
    
    public function rules(): array {
        return [
            'name' => 'required|string|min:4',
            'email' => 'required|email|unique:users',
        ];
    }
}
```

### Frontend Patterns

#### 1. Custom Hooks Pattern
**Purpose**: Encapsulate and reuse stateful logic

```typescript
// Hook encapsulates data fetching, pagination, and search
export const useUsers = () => {
  return usePaginatedSearch<User>({
    queryKeyString: 'users',
    perPage: 15,
    queryFn: getUsers,
  })
}
```

#### 2. Store Pattern (Zustand)
**Purpose**: Centralized state management

```typescript
export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: '',
  login: async (credentials) => {
    // login logic
    set({ user, token, isAuthenticated: true })
  },
  logout: () => {
    set({ user: null, token: '', isAuthenticated: false })
  }
}))
```

#### 3. Action Pattern
**Purpose**: Separate API logic from components

```typescript
const getUsers = async (payload: IGetUsers): Promise<User[]> => {
  try {
    const response = await client.get<HTTPResultsResponse<User[]>>(
      '/api/users',
      formatPayload(payload)
    )
    return response.results.data
  } catch (error) {
    throw new Error(handleHttpError(error))
  }
}
```

#### 4. Compound Component Pattern
**Purpose**: Flexible, composable UI components

```typescript
<Table>
  <TableHead columns={columns} />
  <TableBody data={users} />
  <TableFooter pagination={pagination} />
</Table>
```

## Data Flow

### Complete Request/Response Cycle

```
1. User Action (Click, Form Submit)
        ↓
2. Event Handler in Component
        ↓
3. Custom Hook (e.g., useUsers)
        ↓
4. React Query (usePaginatedSearch)
        ↓
5. Action Function (getUsers)
        ↓
6. HTTP Client (axios) + Auth Token
        ↓
7. Laravel Route (routes/api.php)
        ↓
8. Middleware Chain
   - CORS
   - Authentication (Sanctum)
   - Locale
        ↓
9. Controller Method
        ↓
10. Request Validation
    - Authorization check
    - Validation rules
        ↓
11. Repository Method
        ↓
12. Eloquent Model Query
        ↓
13. Database Query Execution
        ↓
14. Eloquent Collection/Model
        ↓
15. Transformer (Fractal)
        ↓
16. Controller Response Method
        ↓
17. JSON Response
        ↓
18. Action Error Handling
        ↓
19. React Query Cache Update
        ↓
20. Component Re-render
        ↓
21. UI Update
```

## Authentication & Authorization

### Authentication (Laravel Sanctum)

**Token-based authentication** for SPA:

```
1. User logs in (POST /api/auth/login)
2. Backend validates credentials
3. Backend generates Sanctum token
4. Frontend stores token in localStorage
5. Frontend includes token in all requests (Bearer Token)
6. Backend validates token via Sanctum middleware
```

### Authorization (Spatie Permissions)

**Role and Permission-based authorization**:

```php
// Check in FormRequest
public function authorize(): bool {
    return auth()->user()->can('create.users');
}

// Check in Controller
if (!auth()->user()->hasRole('admin')) {
    abort(403);
}

// Check in Blade/Model
$user->hasPermissionTo('edit.articles');
```

## Database Design

### Migration Strategy
- **Versioned migrations**: Each change is a new migration
- **Seeders**: Default data and test data
- **Foreign keys**: Maintain referential integrity
- **Indexes**: On frequently queried columns

### Model Relationships
- **Eloquent ORM**: Define relationships in models
- **Lazy/Eager Loading**: Optimize N+1 queries
- **Observers**: Handle model events (creating, created, updating, etc.)

## API Architecture

### RESTful Conventions

```
GET    /api/users          # List users (with pagination)
GET    /api/users/{id}     # Get single user
POST   /api/users          # Create new user
POST   /api/users/{id}     # Update user (using POST for file uploads)
DELETE /api/users/{id}     # Delete user
```

### Response Structure

**Success Response:**
```json
{
  "results": {
    "data": [...] or {...}
  },
  "status": 200
}
```

**Error Response:**
```json
{
  "data": {
    "message": "Error message",
    "status": 500
  }
}
```

**Validation Error:**
```json
{
  "message": "Validation failed",
  "errors": {
    "email": ["The email field is required."]
  }
}
```

## Key Architectural Decisions

1. **Repository Pattern**: Chosen for testability and flexibility
2. **Fractal Transformers**: Ensures consistent API responses
3. **Sanctum over JWT**: Simpler, Laravel-native, sufficient for SPA
4. **Zustand over Redux**: Lighter, simpler API, less boilerplate
5. **React Query**: Server state management, caching, and synchronization
6. **Context-based modules**: Better organization, easier to scale
7. **TypeScript**: Type safety reduces runtime errors
8. **Tailwind CSS**: Utility-first, consistent design, rapid development

## Scalability Considerations

### Backend
- Repository pattern allows easy caching layer addition
- Service layer for complex business logic
- Queue jobs for heavy operations
- Database indexing for performance

### Frontend
- Code splitting via lazy loading
- React Query caching reduces API calls
- Zustand for efficient state updates
- Modular contexts for independent scaling

---

**Next**: Read the [Backend Guide](./BACKEND.md) or [Frontend Guide](./FRONTEND.md) for detailed implementation information.

