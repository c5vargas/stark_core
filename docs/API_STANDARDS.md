# API Standards

This document defines the API design standards, conventions, and best practices for Stark Core.

## Table of Contents

- [REST Conventions](#rest-conventions)
- [Response Format](#response-format)
- [HTTP Status Codes](#http-status-codes)
- [Error Handling](#error-handling)
- [Pagination](#pagination)
- [Filtering & Searching](#filtering--searching)
- [Authentication](#authentication)
- [Versioning](#versioning)
- [Rate Limiting](#rate-limiting)

## REST Conventions

### Resource Naming

Use **plural nouns** for resource names:

✅ **Good:**

```
GET  /api/users
GET  /api/posts
GET  /api/settings
```

❌ **Bad:**

```
GET  /api/user
GET  /api/post
GET  /api/setting
```

### HTTP Methods

Use appropriate HTTP methods for operations:

| Method      | Operation            | Example               | Response    |
| ----------- | -------------------- | --------------------- | ----------- |
| `GET`       | Retrieve resource(s) | `GET /api/users`      | 200 OK      |
| `POST`      | Create new resource  | `POST /api/users`     | 201 Created |
| `PUT/PATCH` | Update resource      | `PUT /api/users/1`    | 200 OK      |
| `DELETE`    | Delete resource      | `DELETE /api/users/1` | 200 OK      |

**Note**: In Stark Core, we use `POST` for updates when file uploads are involved:

```
POST /api/users/{id}  # When updating with avatar upload
```

### Endpoint Structure

#### Collection Endpoints

```
GET    /api/users          # List all users (paginated)
POST   /api/users          # Create new user
```

#### Individual Resource Endpoints

```
GET    /api/users/{id}     # Get user by ID
POST   /api/users/{id}     # Update user (with files)
DELETE /api/users/{id}     # Delete user
```

#### Nested Resources

```
GET    /api/users/{id}/posts        # Get all posts by user
POST   /api/users/{id}/posts        # Create post for user
GET    /api/users/{id}/posts/{postId}  # Get specific post
```

#### Actions on Resources

For non-CRUD operations, use action names:

```
POST   /api/users/{id}/activate      # Activate user
POST   /api/posts/{id}/publish       # Publish post
POST   /api/settings/mail/test       # Send test email
```

## Response Format

All API responses follow a consistent structure using Fractal transformers.

### Success Response (Single Item)

**Request:**

```
GET /api/users/1
```

**Response:** `200 OK`

```json
{
  "results": {
    "data": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "status": "active",
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z"
    }
  },
  "status": 200,
  "message": "User retrieved successfully"
}
```

### Success Response (Collection)

**Request:**

```
GET /api/users?page=1&perPage=15
```

**Response:** `200 OK`

```json
{
  "results": {
    "data": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "status": "active"
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane@example.com",
        "status": "active"
      }
    ],
    "meta": {
      "pagination": {
        "total": 100,
        "count": 15,
        "per_page": 15,
        "current_page": 1,
        "total_pages": 7
      }
    }
  },
  "status": 200
}
```

### Success Response (Message Only)

**Request:**

```
DELETE /api/users/1
```

**Response:** `200 OK`

```json
{
  "message": "User deleted successfully",
  "status": 200
}
```

### Success Response (Authentication)

**Request:**

```
POST /api/auth/login
```

**Response:** `200 OK`

```json
{
  "results": {
    "token": "1|abc123xyz789...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  },
  "status": 200
}
```

## HTTP Status Codes

Use appropriate HTTP status codes:

### Success Codes (2xx)

| Code  | Meaning    | Usage                                    |
| ----- | ---------- | ---------------------------------------- |
| `200` | OK         | Successful GET, PUT, PATCH, DELETE       |
| `201` | Created    | Successful POST (resource created)       |
| `204` | No Content | Successful request with no response body |

### Client Error Codes (4xx)

| Code  | Meaning              | Usage                                   |
| ----- | -------------------- | --------------------------------------- |
| `400` | Bad Request          | Malformed request, invalid data         |
| `401` | Unauthorized         | Missing or invalid authentication       |
| `403` | Forbidden            | Valid auth but insufficient permissions |
| `404` | Not Found            | Resource doesn't exist                  |
| `422` | Unprocessable Entity | Validation failed                       |
| `429` | Too Many Requests    | Rate limit exceeded                     |

### Server Error Codes (5xx)

| Code  | Meaning               | Usage                          |
| ----- | --------------------- | ------------------------------ |
| `500` | Internal Server Error | Unexpected server error        |
| `503` | Service Unavailable   | Server temporarily unavailable |

## Error Handling

### Validation Error (422)

**Request:**

```json
POST /api/users
{
  "name": "Jo",
  "email": "invalid-email"
}
```

**Response:** `422 Unprocessable Entity`

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "name": ["The name must be at least 4 characters."],
    "email": ["The email must be a valid email address."],
    "password": ["The password field is required."]
  },
  "status": 422
}
```

### Authorization Error (403)

**Response:** `403 Forbidden`

```json
{
  "data": {
    "message": "This action is unauthorized.",
    "status": 403
  }
}
```

### Authentication Error (401)

**Response:** `401 Unauthorized`

```json
{
  "data": {
    "message": "Unauthenticated.",
    "status": 401
  }
}
```

### Not Found Error (404)

**Response:** `404 Not Found`

```json
{
  "data": {
    "message": "Resource not found.",
    "status": 404
  }
}
```

### Server Error (500)

**Response:** `500 Internal Server Error`

```json
{
  "data": {
    "message": "An unexpected error occurred. Please try again later.",
    "status": 500
  }
}
```

### Error Response Structure

**Controller Implementation:**

```php
// Using base controller method
return $this->respondWithError('User not found', 404);

// Throwing exception
throw new Exception('Operation failed', 500);

// Validation (automatic)
public function create(CreateRequest $request) {
    // Laravel automatically returns 422 if validation fails
}
```

## Pagination

### Request Parameters

Use query parameters for pagination:

```
GET /api/users?page=1&perPage=15
```

| Parameter | Type    | Default | Description         |
| --------- | ------- | ------- | ------------------- |
| `page`    | integer | 1       | Current page number |
| `perPage` | integer | 15      | Items per page      |

### Paginated Response

```json
{
  "results": {
    "data": [...],
    "meta": {
      "pagination": {
        "total": 100,           // Total number of items
        "count": 15,            // Items on current page
        "per_page": 15,         // Items per page
        "current_page": 1,      // Current page number
        "total_pages": 7,       // Total number of pages
        "links": {
          "next": "/api/users?page=2&perPage=15",
          "previous": null
        }
      }
    }
  },
  "status": 200
}
```

### Backend Implementation

**Repository:**

```php
public function paginate(array $params)
{
    $query = $this->model->query();

    // Apply filters, search, etc.

    $perPage = $params['perPage'] ?? 15;
    return $query->paginate($perPage);
}
```

**Controller:**

```php
public function index(Request $request)
{
    $users = $this->repository->paginate($request->all());
    return $this->respondWithCollection($users);
}
```

## Filtering & Searching

### Query Parameters

Use query parameters for filtering and searching:

```
GET /api/posts?query=laravel&status=published&user_id=1&sortBy=created_at&sortOrder=desc
```

| Parameter   | Type    | Description                            |
| ----------- | ------- | -------------------------------------- |
| `query`     | string  | Search term (searches multiple fields) |
| `status`    | string  | Filter by status                       |
| `user_id`   | integer | Filter by user                         |
| `sortBy`    | string  | Field to sort by                       |
| `sortOrder` | string  | `asc` or `desc`                        |

### Backend Implementation

**Repository:**

```php
public function paginate(array $params)
{
    $query = $this->model->query();

    // Search
    if (isset($params['query']) && !empty($params['query'])) {
        $query->where('title', 'like', '%' . $params['query'] . '%')
              ->orWhere('content', 'like', '%' . $params['query'] . '%');
    }

    // Filter by status
    if (isset($params['status'])) {
        $query->where('status', $params['status']);
    }

    // Filter by user
    if (isset($params['user_id'])) {
        $query->where('user_id', $params['user_id']);
    }

    // Sort
    $sortBy = $params['sortBy'] ?? 'created_at';
    $sortOrder = $params['sortOrder'] ?? 'desc';
    $query->orderBy($sortBy, $sortOrder);

    $perPage = $params['perPage'] ?? 15;
    return $query->paginate($perPage);
}
```

### Frontend Implementation

```typescript
const getUsers = async (payload: {
  page: number
  perPage: number
  query?: string
  status?: string
}): Promise<User[]> => {
  const formData = formatPayload(payload)
  const response = await client.get('/api/users', formData)
  return response.results.data
}
```

## Authentication

### Token-Based Authentication (Sanctum)

All protected endpoints require a Bearer token in the Authorization header.

**Request:**

```http
GET /api/users
Authorization: Bearer 1|abc123xyz789...
X-Locale: en
```

### Login Flow

1. **Login Request:**

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

2. **Login Response:**

```json
{
  "results": {
    "token": "1|abc123xyz789...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  },
  "status": 200
}
```

3. **Use Token in Subsequent Requests:**

```http
GET /api/users
Authorization: Bearer 1|abc123xyz789...
```

### Logout

```http
POST /api/auth/logout
Authorization: Bearer 1|abc123xyz789...
```

Response:

```json
{
  "message": "Logged out successfully",
  "status": 200
}
```

### Permission-Based Authorization

Endpoints check permissions:

```php
// In FormRequest
public function authorize(): bool
{
    return auth()->user()->can('create.users');
}

// In Controller
if (!auth()->user()->can('delete.posts')) {
    throw new Exception('Unauthorized', 403);
}
```

## Versioning

Currently, Stark Core doesn't use API versioning. When needed, use URL-based versioning:

### Future Versioning Strategy

```
GET /api/v1/users
GET /api/v2/users
```

**Implementation:**

```php
// routes/api.php
Route::prefix('v1')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
});

Route::prefix('v2')->group(function () {
    Route::get('/users', [UserV2Controller::class, 'index']);
});
```

## Rate Limiting

Laravel's throttle middleware can be applied to routes:

```php
Route::middleware(['throttle:60,1'])->group(function () {
    // 60 requests per minute
    Route::get('/api/users', [UserController::class, 'index']);
});
```

**Response Headers:**

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1640000000
```

**Rate Limit Exceeded:**

```json
{
  "message": "Too Many Attempts.",
  "status": 429
}
```

## Additional Headers

### Standard Headers

**Request Headers:**

```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer {token}
X-Locale: en
```

**Response Headers:**

```http
Content-Type: application/json
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
```

### Include Related Resources

Use `include` query parameter to include relationships:

```
GET /api/posts?include=user,comments
```

**Backend:**

```php
// Transformer supports includes
protected array $availableIncludes = [
    'user',
    'comments',
];

public function includeUser(Post $post)
{
    return $this->item($post->user, new UserTransformer());
}
```

**Response:**

```json
{
  "results": {
    "data": {
      "id": 1,
      "title": "My Post",
      "user": {
        "id": 1,
        "name": "John Doe"
      }
    }
  }
}
```

## Best Practices

### 1. Use Transformers

Always transform model data before returning:

```php
// ✅ Good
return $this->respondWithItem($user);

// ❌ Bad
return response()->json($user);
```

### 2. Validate All Inputs

Use FormRequest classes:

```php
// ✅ Good
public function create(CreateRequest $request)

// ❌ Bad
public function create(Request $request) {
    $request->validate([...]);
}
```

### 3. Use Appropriate Status Codes

```php
// ✅ Good
return $this->respondWithItem($user, 201, 'User created');

// ❌ Bad
return $this->respondWithItem($user); // Always 200
```

### 4. Handle Errors Gracefully

```php
// ✅ Good
try {
    $user = $this->repository->create($data);
    return $this->respondWithItem($user, 201);
} catch (Exception $e) {
    return $this->respondWithError($e->getMessage(), 500);
}

// ❌ Bad
$user = $this->repository->create($data); // Unhandled exception
return $this->respondWithItem($user);
```

### 5. Use Pagination

```php
// ✅ Good
$users = $this->repository->paginate($request->all());

// ❌ Bad
$users = User::all(); // Returns all records
```

### 6. Consistent Naming

```php
// ✅ Good
GET  /api/users/{id}/posts
POST /api/users/{id}/posts

// ❌ Bad
GET  /api/user/{id}/post
POST /api/users/{id}/create-post
```

## Summary

- Use RESTful conventions
- Return consistent response structures
- Use appropriate HTTP status codes
- Implement proper error handling
- Support pagination, filtering, and search
- Use token-based authentication
- Transform all responses with Fractal
- Validate all inputs with FormRequests
- Document all endpoints

---

**Next**: Learn about testing strategies in the [Testing Guide](./TESTING.md).
