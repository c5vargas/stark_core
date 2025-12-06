# Testing Guide

Comprehensive guide to testing strategies, best practices, and implementation in Stark Core.

## Table of Contents

- [Overview](#overview)
- [Backend Testing](#backend-testing)
- [Frontend Testing](#frontend-testing)
- [Testing Strategy](#testing-strategy)
- [Writing Tests](#writing-tests)
- [Running Tests](#running-tests)
- [Best Practices](#best-practices)

## Overview

Testing ensures code quality, prevents regressions, and provides confidence when making changes.

### Testing Stack

**Backend:**
- **PHPUnit** - PHP testing framework
- **Laravel Testing Utilities** - Database factories, assertions
- **Pest** (optional) - Modern testing framework for PHP

**Frontend:**
- **Vitest** (recommended) - Fast unit test framework
- **React Testing Library** - Component testing
- **Testing Library User Event** - User interaction simulation

### Test Types

| Type | Purpose | Scope | Example |
|------|---------|-------|---------|
| **Unit** | Test individual functions/methods | Single function | Test a utility function |
| **Integration** | Test component interactions | Multiple components | Test API call flow |
| **Feature** | Test complete features | End-to-end flow | Test user registration |
| **E2E** | Test entire application | Full user journey | Test checkout process |

## Backend Testing

### Test Structure

```
tests/
├── Feature/              # Feature tests (integration)
│   ├── Auth/
│   │   ├── LoginTest.php
│   │   └── RegisterTest.php
│   ├── User/
│   │   ├── UserCreationTest.php
│   │   └── UserUpdateTest.php
│   └── Post/
│       └── PostManagementTest.php
├── Unit/                 # Unit tests
│   ├── Models/
│   │   └── UserTest.php
│   ├── Repositories/
│   │   └── UserRepositoryTest.php
│   └── Services/
│       └── OneSignalServiceTest.php
└── TestCase.php         # Base test case
```

### PHPUnit Configuration

**File**: `phpunit.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="./vendor/phpunit/phpunit/phpunit.xsd"
         bootstrap="vendor/autoload.php"
         colors="true">
    <testsuites>
        <testsuite name="Unit">
            <directory suffix="Test.php">./tests/Unit</directory>
        </testsuite>
        <testsuite name="Feature">
            <directory suffix="Test.php">./tests/Feature</directory>
        </testsuite>
    </testsuites>
    <php>
        <env name="APP_ENV" value="testing"/>
        <env name="DB_CONNECTION" value="sqlite"/>
        <env name="DB_DATABASE" value=":memory:"/>
    </php>
</phpunit>
```

### Feature Test Example

**File**: `tests/Feature/User/UserCreationTest.php`

```php
<?php

namespace Tests\Feature\User;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserCreationTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function authenticated_admin_can_create_user()
    {
        // Arrange: Create admin user
        $admin = User::factory()->create();
        $admin->assignRole('admin');
        $token = $admin->createToken('test')->plainTextToken;

        // Act: Send POST request
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'status' => 'active',
        ]);

        // Assert: Check response
        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'results' => [
                         'data' => [
                             'id',
                             'name',
                             'email',
                             'status',
                         ]
                     ],
                     'status',
                     'message',
                 ]);

        // Assert: Check database
        $this->assertDatabaseHas('users', [
            'email' => 'john@example.com',
            'name' => 'John Doe',
        ]);
    }

    /** @test */
    public function user_creation_fails_with_invalid_email()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');
        $token = $admin->createToken('test')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/users', [
            'name' => 'John Doe',
            'email' => 'invalid-email',
            'password' => 'password123',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email']);
    }

    /** @test */
    public function guest_cannot_create_user()
    {
        $response = $this->postJson('/api/users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(401);
    }

    /** @test */
    public function user_without_permission_cannot_create_user()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(403);
    }
}
```

### Unit Test Example

**File**: `tests/Unit/Repositories/UserRepositoryTest.php`

```php
<?php

namespace Tests\Unit\Repositories;

use App\Models\User;
use App\Repositories\Eloquent\UserRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserRepositoryTest extends TestCase
{
    use RefreshDatabase;

    private UserRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new UserRepository(new User());
    }

    /** @test */
    public function it_can_create_user()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
        ];

        $user = $this->repository->create($userData);

        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals('John Doe', $user->name);
        $this->assertEquals('john@example.com', $user->email);
    }

    /** @test */
    public function it_can_find_user_by_id()
    {
        $user = User::factory()->create();

        $foundUser = $this->repository->find($user->id);

        $this->assertInstanceOf(User::class, $foundUser);
        $this->assertEquals($user->id, $foundUser->id);
    }

    /** @test */
    public function it_can_update_user()
    {
        $user = User::factory()->create(['name' => 'Original Name']);

        $updated = $this->repository->update([
            'name' => 'Updated Name'
        ], $user->id);

        $this->assertTrue($updated);
        $this->assertEquals('Updated Name', $user->fresh()->name);
    }

    /** @test */
    public function it_can_delete_user()
    {
        $user = User::factory()->create();

        $deleted = $this->repository->delete($user->id);

        $this->assertTrue($deleted);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    /** @test */
    public function it_can_paginate_users()
    {
        User::factory()->count(25)->create();

        $result = $this->repository->paginate(['perPage' => 10]);

        $this->assertCount(10, $result->items());
        $this->assertEquals(25, $result->total());
        $this->assertEquals(3, $result->lastPage());
    }

    /** @test */
    public function it_can_search_users()
    {
        User::factory()->create(['name' => 'John Doe', 'email' => 'john@example.com']);
        User::factory()->create(['name' => 'Jane Smith', 'email' => 'jane@example.com']);

        $result = $this->repository->paginate(['query' => 'John']);

        $this->assertCount(1, $result->items());
        $this->assertEquals('John Doe', $result->items()[0]->name);
    }
}
```

### Model Test Example

**File**: `tests/Unit/Models/UserTest.php`

```php
<?php

namespace Tests\Unit\Models;

use App\Enums\UserStatus;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_hashes_password_on_creation()
    {
        $user = User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'plain-password',
        ]);

        $this->assertNotEquals('plain-password', $user->password);
        $this->assertTrue(\Hash::check('plain-password', $user->password));
    }

    /** @test */
    public function it_can_check_if_user_is_active()
    {
        $activeUser = User::factory()->create(['status' => UserStatus::ACTIVE]);
        $inactiveUser = User::factory()->create(['status' => UserStatus::INACTIVE]);

        $this->assertTrue($activeUser->isActive());
        $this->assertFalse($inactiveUser->isActive());
    }

    /** @test */
    public function it_can_scope_active_users()
    {
        User::factory()->count(3)->create(['status' => UserStatus::ACTIVE]);
        User::factory()->count(2)->create(['status' => UserStatus::INACTIVE]);

        $activeUsers = User::active()->get();

        $this->assertCount(3, $activeUsers);
    }

    /** @test */
    public function it_casts_status_to_enum()
    {
        $user = User::factory()->create(['status' => 'active']);

        $this->assertInstanceOf(UserStatus::class, $user->status);
        $this->assertEquals(UserStatus::ACTIVE, $user->status);
    }
}
```

### Database Factories

**File**: `database/factories/UserFactory.php`

```php
<?php

namespace Database\Factories;

use App\Enums\UserStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'username' => fake()->unique()->userName(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => 'password', // Will be hashed by mutator
            'avatar' => fake()->imageUrl(),
            'status' => UserStatus::ACTIVE,
            'locale' => 'en',
            'remember_token' => Str::random(10),
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => UserStatus::INACTIVE,
        ]);
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
```

## Frontend Testing

### Test Structure

```
resources/js/
├── contexts/
│   ├── user/
│   │   ├── __tests__/
│   │   │   ├── useUsers.test.ts
│   │   │   ├── UserCard.test.tsx
│   │   │   └── getUsers.test.ts
│   │   ├── actions/
│   │   ├── components/
│   │   └── hooks/
│   └── shared/
│       └── __tests__/
│           ├── Button.test.tsx
│           └── useForm.test.ts
└── setupTests.ts
```

### Vitest Configuration

**File**: `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./resources/js/setupTests.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './resources/js'),
    },
  },
})
```

### Setup File

**File**: `resources/js/setupTests.ts`

```typescript
import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock window.localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock as any
```

### Component Test Example

**File**: `resources/js/contexts/user/components/__tests__/UserCard.test.tsx`

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { UserCard } from '../UserCard'
import { User } from '../../libs/types'

describe('UserCard', () => {
  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    avatar: 'https://example.com/avatar.jpg',
    created_at: '2024-01-15T10:30:00.000Z',
    updated_at: '2024-01-15T10:30:00.000Z',
  }

  const mockOnEdit = vi.fn()
  const mockOnDelete = vi.fn()

  it('renders user information correctly', () => {
    render(
      <UserCard 
        user={mockUser} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getByAltText('John Doe')).toHaveAttribute(
      'src', 
      'https://example.com/avatar.jpg'
    )
  })

  it('calls onEdit when edit button is clicked', () => {
    render(
      <UserCard 
        user={mockUser} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    )

    const editButton = screen.getByText('Edit')
    fireEvent.click(editButton)

    expect(mockOnEdit).toHaveBeenCalledWith(1)
    expect(mockOnEdit).toHaveBeenCalledTimes(1)
  })

  it('calls onDelete when delete button is clicked', () => {
    render(
      <UserCard 
        user={mockUser} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    )

    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledWith(1)
    expect(mockOnDelete).toHaveBeenCalledTimes(1)
  })

  it('displays status badge correctly', () => {
    render(
      <UserCard 
        user={mockUser} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    )

    expect(screen.getByText('active')).toBeInTheDocument()
  })
})
```

### Hook Test Example

**File**: `resources/js/contexts/shared/hooks/__tests__/useForm.test.ts`

```typescript
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useForm } from '../useForm'

describe('useForm', () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  }

  const mockOnSubmit = vi.fn()

  it('initializes with provided values', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues,
        onSubmit: mockOnSubmit,
      })
    )

    expect(result.current.values).toEqual(initialValues)
    expect(result.current.errors).toEqual({})
    expect(result.current.isSubmitting).toBe(false)
  })

  it('updates field value when handleChange is called', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues,
        onSubmit: mockOnSubmit,
      })
    )

    act(() => {
      result.current.handleChange('name', 'John Doe')
    })

    expect(result.current.values.name).toBe('John Doe')
  })

  it('validates form before submission', async () => {
    const validate = (values: typeof initialValues) => {
      const errors: Record<string, string> = {}
      if (!values.name) errors.name = 'Name is required'
      if (!values.email) errors.email = 'Email is required'
      return errors
    }

    const { result } = renderHook(() =>
      useForm({
        initialValues,
        onSubmit: mockOnSubmit,
        validate,
      })
    )

    await act(async () => {
      await result.current.handleSubmit()
    })

    expect(result.current.errors).toEqual({
      name: 'Name is required',
      email: 'Email is required',
    })
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('submits form when validation passes', async () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues,
        onSubmit: mockOnSubmit,
      })
    )

    act(() => {
      result.current.handleChange('name', 'John Doe')
      result.current.handleChange('email', 'john@example.com')
      result.current.handleChange('password', 'password123')
    })

    await act(async () => {
      await result.current.handleSubmit()
    })

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    })
  })

  it('clears field error when value changes', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues,
        onSubmit: mockOnSubmit,
      })
    )

    act(() => {
      result.current.setErrors({ name: 'Name is required' })
    })

    expect(result.current.errors.name).toBe('Name is required')

    act(() => {
      result.current.handleChange('name', 'John')
    })

    expect(result.current.errors.name).toBeUndefined()
  })
})
```

### Action Test Example

**File**: `resources/js/contexts/user/actions/__tests__/getUsers.test.ts`

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import getUsers from '../getUsers'
import client from '@/contexts/shared/libs/api/httpAxios'

vi.mock('@/contexts/shared/libs/api/httpAxios')

describe('getUsers', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches users successfully', async () => {
    const mockResponse = {
      results: {
        data: [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        ],
      },
      status: 200,
    }

    vi.mocked(client.get).mockResolvedValue(mockResponse)

    const result = await getUsers({ page: 1, perPage: 15 })

    expect(client.get).toHaveBeenCalledWith(
      '/api/users',
      expect.any(Object)
    )
    expect(result).toEqual(mockResponse.results.data)
  })

  it('throws error when request fails', async () => {
    const mockError = new Error('Network error')
    vi.mocked(client.get).mockRejectedValue(mockError)

    await expect(
      getUsers({ page: 1, perPage: 15 })
    ).rejects.toThrow()
  })

  it('includes search query in request', async () => {
    const mockResponse = {
      results: { data: [] },
      status: 200,
    }

    vi.mocked(client.get).mockResolvedValue(mockResponse)

    await getUsers({ page: 1, perPage: 15, query: 'John' })

    expect(client.get).toHaveBeenCalledWith(
      '/api/users',
      expect.objectContaining({
        params: expect.objectContaining({
          query: 'John',
        }),
      })
    )
  })
})
```

## Testing Strategy

### Test Pyramid

```
        ╱╲
       ╱  ╲     E2E Tests (Few)
      ╱────╲    - Complete user flows
     ╱      ╲   - Critical paths only
    ╱────────╲
   ╱Integration╲  Integration Tests (Some)
  ╱────────────╲ - API endpoints
 ╱      Unit     ╲ - Component interactions
╱────────────────╲
     Unit Tests    Unit Tests (Many)
                   - Functions, utilities
                   - Components
                   - Hooks
```

### What to Test

#### Backend

✅ **Test:**
- API endpoints (Feature tests)
- Repository methods (Unit tests)
- Model methods and scopes (Unit tests)
- Request validation (Feature tests)
- Authorization logic (Feature tests)
- Transformer output (Unit tests)
- Service classes (Unit tests)

❌ **Don't Test:**
- Framework code
- Third-party packages
- Simple getters/setters

#### Frontend

✅ **Test:**
- Component rendering
- User interactions
- Hook behavior
- Action functions
- Utility functions
- Form validation

❌ **Don't Test:**
- Third-party libraries
- CSS/styling
- Static content

## Running Tests

### Backend Tests

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/User/UserCreationTest.php

# Run specific test method
php artisan test --filter test_authenticated_admin_can_create_user

# Run with coverage
php artisan test --coverage

# Run only unit tests
php artisan test --testsuite=Unit

# Run only feature tests
php artisan test --testsuite=Feature
```

### Frontend Tests

```bash
# Run all tests
npm run test

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific test file
npm run test -- UserCard.test.tsx

# Update snapshots
npm run test -- -u
```

### Continuous Integration

**GitHub Actions Example:**

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'

      - name: Install Backend Dependencies
        run: composer install

      - name: Run Backend Tests
        run: php artisan test

      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install Frontend Dependencies
        run: npm install

      - name: Run Frontend Tests
        run: npm run test
```

## Best Practices

### 1. Arrange-Act-Assert Pattern

```php
/** @test */
public function it_creates_user()
{
    // Arrange: Setup test data
    $userData = ['name' => 'John', 'email' => 'john@example.com'];

    // Act: Perform action
    $user = $this->repository->create($userData);

    // Assert: Verify result
    $this->assertInstanceOf(User::class, $user);
    $this->assertEquals('John', $user->name);
}
```

### 2. One Assert Per Test (when possible)

```php
// ✅ Good
/** @test */
public function it_returns_correct_status_code()
{
    $response = $this->get('/api/users');
    $response->assertStatus(200);
}

/** @test */
public function it_returns_correct_structure()
{
    $response = $this->get('/api/users');
    $response->assertJsonStructure(['results' => ['data']]);
}

// ❌ Less ideal (but acceptable for related assertions)
/** @test */
public function it_returns_valid_response()
{
    $response = $this->get('/api/users');
    $response->assertStatus(200);
    $response->assertJsonStructure(['results']);
    $response->assertJson(['status' => 200]);
}
```

### 3. Use Descriptive Test Names

```php
// ✅ Good
/** @test */
public function authenticated_admin_can_create_user()

/** @test */
public function user_creation_fails_with_invalid_email()

// ❌ Bad
/** @test */
public function test_create()

/** @test */
public function test_validation()
```

### 4. Keep Tests Independent

```php
// ✅ Good - Each test creates its own data
/** @test */
public function it_can_update_user()
{
    $user = User::factory()->create();
    // Test logic...
}

// ❌ Bad - Tests depend on each other
private $user;

public function setUp(): void
{
    $this->user = User::factory()->create();
}
```

### 5. Use Factories

```php
// ✅ Good
$user = User::factory()->create();
$users = User::factory()->count(10)->create();
$inactiveUser = User::factory()->inactive()->create();

// ❌ Bad
$user = User::create([
    'name' => 'Test',
    'email' => 'test@example.com',
    'password' => 'password',
    // ... many more fields
]);
```

### 6. Mock External Services

```typescript
// ✅ Good
vi.mock('@/contexts/shared/libs/api/httpAxios')
vi.mocked(client.get).mockResolvedValue(mockData)

// ❌ Bad - Makes real API calls
const result = await fetch('https://api.example.com/data')
```

---

**Next**: Learn about deployment in the [Deployment Guide](./DEPLOYMENT.md).

