# Backend Guide

Complete guide to the Laravel backend architecture, patterns, and implementation details.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Controllers](#controllers)
- [Repositories](#repositories)
- [Models](#models)
- [Request Validation](#request-validation)
- [Transformers](#transformers)
- [Middleware](#middleware)
- [Services](#services)
- [Routes](#routes)
- [Database](#database)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)

## Overview

The backend is built with **Laravel 12.x** and follows a **Repository Pattern** architecture for clean separation of concerns and improved testability.

### Technology Stack

- **PHP**: 8.3+
- **Framework**: Laravel 12.x
- **Database**: MySQL/PostgreSQL
- **Authentication**: Laravel Sanctum
- **Permissions**: Spatie Laravel Permission
- **API Transformation**: League Fractal
- **Code Style**: Laravel Pint (PSR-12)

## Project Structure

```
app/
├── Console/
│   └── Kernel.php                 # Console commands
├── Enums/
│   └── UserStatus.php             # Type-safe enums
├── Events/
│   └── UserSignedUp.php           # Application events
├── Exceptions/
│   └── Handler.php                # Global exception handler
├── Http/
│   ├── Controllers/               # API controllers
│   │   ├── Controller.php         # Base controller
│   │   ├── AuthController.php
│   │   ├── UserController.php
│   │   └── ...
│   ├── Middleware/                # Custom middleware
│   │   ├── ApplyLocale.php
│   │   └── ...
│   ├── Requests/                  # Validation classes
│   │   └── Api/
│   │       ├── User/
│   │       │   ├── CreateRequest.php
│   │       │   └── UpdateRequest.php
│   │       └── ...
│   └── Transformers/              # Fractal transformers
│       ├── UserTransformer.php
│       └── ...
├── Jobs/                          # Queue jobs
│   ├── SendWelcomeMailJob.php
│   └── ...
├── Listeners/                     # Event listeners
│   └── SendWelcomeMail.php
├── Mail/                          # Mail classes
│   └── WelcomeMail.php
├── Models/                        # Eloquent models
│   ├── User.php
│   ├── Setting.php
│   └── ...
├── Observers/                     # Model observers
│   └── UserObserver.php
├── Providers/                     # Service providers
│   ├── AppServiceProvider.php
│   ├── RepositoryServiceProvider.php
│   └── ...
├── Repositories/                  # Repository pattern
│   ├── EloquentRepositoryInterface.php
│   └── Eloquent/
│       ├── BaseRepository.php
│       ├── UserRepository.php
│       └── ...
└── Services/                      # Business logic services
    └── OneSignalService.php
```

## Controllers

Controllers in Stark Core are **thin coordination layers** that delegate work to repositories and transformers.

### Base Controller

All controllers extend the base controller which provides standardized response methods:

**File**: `app/Http/Controllers/Controller.php`

```php
class Controller extends BaseController
{
    protected $fractal;
    protected $transformer;

    public function __construct(
        Transformer $transformer = null,
        Request $request
    ) {
        $this->fractal = new Manager();
        $this->transformer = $transformer;
        $this->fractal->parseIncludes(explode(',', $request->get('include')));
    }

    // Response methods available to all controllers
    protected function respondWithError(string $message, int $status = 500)
    protected function respondWithMessage(string $message, int $status = 200)
    protected function respondWithArray($array, int $status = 200)
    protected function respondWithAuth(Authenticatable|null $user, int $status = 200)
    protected function respondWithItem(object $item, int $status = 200, string $message = '')
    protected function respondWithCollection(object $item, int $status = 200)
}
```

### Standard Controller Pattern

**Example**: `app/Http/Controllers/UserController.php`

```php
class UserController extends Controller
{
    private $repository;

    public function __construct(
        UserTransformer $transformer,
        UserRepository $repository,
        Request $request
    ){
        parent::__construct($transformer, $request);
        $this->repository = $repository;
    }

    // List all users (with pagination)
    public function index(Request $request)
    {
        $users = $this->repository->paginate($request->all());
        return $this->respondWithCollection($users);
    }

    // Get single user
    public function show(int $id)
    {
        $user = $this->repository->find($id);
        return $this->respondWithItem($user);
    }

    // Create new user
    public function create(CreateRequest $request)
    {
        $user = $this->repository->create($request->validated());
        return $this->respondWithItem($user, 201, __('messages.controller.user.created'));
    }

    // Update existing user
    public function update(UpdateRequest $request)
    {
        $updated = $this->repository->update(
            $request->validated(),
            $request->input('id')
        );

        if(!$updated)
            throw new Exception(__('messages.controller.common.error_500'), 500);

        return $this->respondWithMessage(__('messages.controller.updated'));
    }

    // Delete user
    public function delete($id)
    {
        $deleted = $this->repository->delete($id);

        if(!$deleted)
            throw new Exception(__('messages.controller.common.error_500'), 500);

        return $this->respondWithMessage(__('messages.controller.user.deleted'));
    }
}
```

### Controller Responsibilities

✅ **DO**:
- Inject dependencies (Repository, Transformer)
- Delegate data operations to repositories
- Use Request classes for validation
- Return standardized responses using base methods
- Handle high-level flow control

❌ **DON'T**:
- Query models directly
- Contain business logic
- Perform validation manually
- Build complex queries
- Format responses manually

## Repositories

Repositories abstract data access logic and provide a clean API for data operations.

### Interface

**File**: `app/Repositories/EloquentRepositoryInterface.php`

```php
interface EloquentRepositoryInterface
{
    public function all(): Collection;
    public function create(array $data): ?Model;
    public function update(array $data, int $id): bool;
    public function delete(int $id): bool;
    public function find(int $id): ?Model;
}
```

### Base Repository

**File**: `app/Repositories/Eloquent/BaseRepository.php`

```php
class BaseRepository implements EloquentRepositoryInterface
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function find(int $id): Model
    {
        return $this->model->findOrFail($id);
    }

    public function all(): Collection
    {
        return $this->model->all();
    }

    public function create(array $data): Model
    {
        return $this->model->create($data);
    }

    public function update(array $data, int $id): bool
    {
        $model = $this->find($id);
        return $model->update($data);
    }

    public function delete(int $id): bool
    {
        $model = $this->find($id);
        if(!$model) return false;
        return $model->delete();
    }
}
```

### Custom Repository

**File**: `app/Repositories/Eloquent/UserRepository.php`

```php
class UserRepository extends BaseRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    // Custom method for paginated results
    public function paginate(array $params)
    {
        $query = $this->model->query();
        
        // Add search filter
        if(isset($params['query']) && !empty($params['query'])) {
            $query->where('name', 'like', '%' . $params['query'] . '%')
                  ->orWhere('email', 'like', '%' . $params['query'] . '%');
        }
        
        $perPage = $params['perPage'] ?? 15;
        return $query->paginate($perPage);
    }

    // Custom method for specific business logic
    public function findByEmail(string $email): ?User
    {
        return $this->model->where('email', $email)->first();
    }
}
```

### Repository Registration

Repositories are registered in the service provider:

**File**: `app/Providers/RepositoryServiceProvider.php`

```php
class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(EloquentRepositoryInterface::class, BaseRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
    }
}
```

## Models

Models represent database tables and define relationships, accessors, mutators, and scopes.

### Standard Model Structure

**File**: `app/Models/User.php`

```php
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    // 1. Mass assignable attributes
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'avatar',
        'status',
        'last_login_at',
        'locale',
        'metadata',
    ];

    // 2. Hidden attributes (not in JSON)
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // 3. Type casting
    protected $casts = [
        'status'            => UserStatus::class,
        'email_verified_at' => 'datetime',
        'last_login_at'     => 'datetime',
        'password'          => 'hashed',
        'metadata'          => 'array',
    ];

    // 4. Mutators (set attributes)
    public function setPasswordAttribute(string $value) {
        $this->attributes['password'] = Hash::make($value);
    }

    // 5. Accessors (get attributes)
    public function getAllPermissionsAttribute() {
        $user = Auth::user();
        $permissions = [];
        
        foreach (Permission::all() as $permission) {
            if ($user->can($permission->name)) {
                $permissions[] = $permission->name;
            }
        }
        
        return $permissions;
    }

    // 6. Query Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    // 7. Helper Methods
    public function isActive(): bool
    {
        return $this->status === UserStatus::ACTIVE;
    }

    // 8. Relationships
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
```

### Model Best Practices

✅ **DO**:
- Use Enums for status fields
- Define relationships explicitly
- Use type casting for complex types (JSON, dates)
- Create query scopes for common filters
- Hash passwords in mutators
- Use model observers for lifecycle events

❌ **DON'T**:
- Put complex business logic in models
- Query other models directly (use repositories)
- Expose sensitive data (use `$hidden`)

## Request Validation

Laravel Form Requests handle validation and authorization in a dedicated class.

### Standard Request Structure

**File**: `app/Http/Requests/Api/User/CreateRequest.php`

```php
class CreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return (auth()->check() && auth()->user()->can('create.users'));
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name'      => 'required|string|min:4|max:100',
            'username'  => 'nullable|string|min:3|max:50|unique:users,username',
            'email'     => 'required|email|unique:users,email',
            'password'  => 'required|string|min:6',
            'avatar'    => 'nullable|url|max:255',
            'status'    => ['sometimes', new Enum(UserStatus::class)],
            'locale'    => 'nullable|string|size:2',
            'metadata'  => 'nullable|array',
        ];
    }

    /**
     * Custom error messages (optional)
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The name field is required.',
            'email.unique' => 'This email is already registered.',
        ];
    }
}
```

### Usage in Controller

```php
public function create(CreateRequest $request)
{
    // Request is already validated and authorized
    $data = $request->validated();
    $user = $this->repository->create($data);
    return $this->respondWithItem($user, 201);
}
```

## Transformers

Transformers format model data for API responses using League Fractal.

### Standard Transformer

**File**: `app/Http/Transformers/UserTransformer.php`

```php
class UserTransformer extends TransformerAbstract
{
    public function transform(User $user)
    {
        return [
            'id'            => $user->id,
            'name'          => $user->name,
            'username'      => $user->username,
            'email'         => $user->email,
            'avatar'        => $user->avatar,
            'status'        => $user->status instanceof \BackedEnum 
                                ? $user->status->value 
                                : $user->status,
            'locale'        => $user->locale,
            'metadata'      => $user->metadata ?? [],
            'last_login_at' => $user->last_login_at,
            'created_at'    => $user->created_at,
            'updated_at'    => $user->updated_at,
        ];
    }
}
```

### Benefits

- **Consistency**: All API responses have the same format
- **Security**: Control exactly what data is exposed
- **Flexibility**: Easy to add computed fields
- **Versioning**: Can have multiple transformers for different API versions

## Middleware

Middleware processes requests before they reach controllers.

### Custom Middleware Example

**File**: `app/Http/Middleware/ApplyLocale.php`

```php
class ApplyLocale
{
    public function handle(Request $request, Closure $next)
    {
        $locale = $request->header('X-Locale');
        
        if(!empty($locale)) {
            app()->setLocale($locale);
        }
        
        return $next($request);
    }
}
```

### Common Middleware

- `auth:sanctum` - Authentication via Laravel Sanctum
- `apply_locale` - Set application locale from header
- `throttle` - Rate limiting
- `cors` - CORS configuration

### Applying Middleware

**In routes:**
```php
Route::middleware(['auth:sanctum', 'apply_locale'])->group(function() {
    Route::get('/users', [UserController::class, 'index']);
});
```

## Services

Services encapsulate complex business logic or external integrations.

### Service Example

**File**: `app/Services/OneSignalService.php`

```php
class OneSignalService
{
    protected $client;
    protected $appId;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->appId = config('services.onesignal.app_id');
        $this->apiKey = config('services.onesignal.api_key');
    }

    public function sendNotification(array $data)
    {
        $response = $this->client->post('https://onesignal.com/api/v1/notifications', [
            'headers' => [
                'Authorization' => 'Basic ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ],
            'json' => array_merge($data, ['app_id' => $this->appId]),
        ]);

        return json_decode($response->getBody(), true);
    }
}
```

### When to Use Services

- External API integrations
- Complex business logic spanning multiple models
- Operations that don't fit in a single repository
- Reusable logic across multiple controllers

## Routes

Routes define the API endpoints and map them to controllers.

### Route Structure

**File**: `routes/api.php`

```php
// Public routes
Route::prefix('auth')->middleware(['apply_locale'])->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('password/forget', [AuthController::class, 'forgetPassword']);
    
    // Protected auth routes
    Route::middleware(['auth:sanctum'])->group(function() {
        Route::get('', [AuthController::class, 'get']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('update', [AuthController::class, 'updateUserProfile']);
    });
});

// Protected routes
Route::middleware(['auth:sanctum', 'apply_locale'])->group(function() {
    // User management
    Route::prefix('users')->group(function () {
        Route::get('', [UserController::class, 'index']);
        Route::get('/{id}', [UserController::class, 'show']);
        Route::post('', [UserController::class, 'create']);
        Route::post('/{id}', [UserController::class, 'update']);
        Route::delete('/{id}', [UserController::class, 'delete']);
    });

    // Settings
    Route::prefix('settings')->group(function () {
        Route::get('', [SettingController::class, 'index']);
        Route::post('', [SettingController::class, 'update']);
    });
});
```

### Route Conventions

- Use resource names in plural (`/users`, `/posts`)
- Use HTTP verbs correctly (GET, POST, PUT/PATCH, DELETE)
- Group related routes with `prefix()`
- Apply middleware at group level
- Use route names for easier refactoring

## Database

### Migrations

Migrations are version control for your database:

```php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('username')->unique()->nullable();
    $table->string('email')->unique();
    $table->timestamp('email_verified_at')->nullable();
    $table->string('password');
    $table->string('avatar')->nullable();
    $table->enum('status', ['active', 'inactive', 'banned'])->default('active');
    $table->timestamp('last_login_at')->nullable();
    $table->string('locale', 2)->default('en');
    $table->json('metadata')->nullable();
    $table->rememberToken();
    $table->timestamps();
});
```

### Seeders

Seeders populate initial or test data:

```php
class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => 'password',
            'status' => UserStatus::ACTIVE,
        ])->assignRole('admin');
    }
}
```

## Authentication

### Laravel Sanctum

Stark Core uses Laravel Sanctum for API authentication.

#### Login Flow

```php
public function login(LoginRequest $request)
{
    $credentials = $request->validated();
    
    if (!Auth::attempt($credentials)) {
        throw new Exception('Invalid credentials', 401);
    }
    
    $user = Auth::user();
    $token = $user->createToken('auth_token')->plainTextToken;
    
    return response()->json([
        'results' => [
            'token' => $token,
            'user' => $user,
        ],
        'status' => 200
    ]);
}
```

#### Protecting Routes

```php
Route::middleware(['auth:sanctum'])->group(function() {
    // Protected routes
});
```

#### Accessing Authenticated User

```php
$user = auth()->user();
$user = $request->user();
```

## Error Handling

### Global Exception Handler

**File**: `app/Exceptions/Handler.php`

Customize error responses here:

```php
public function render($request, Throwable $exception)
{
    if ($request->is('api/*')) {
        return response()->json([
            'data' => [
                'message' => $exception->getMessage(),
                'status' => $exception->getCode() ?: 500,
            ]
        ], $exception->getCode() ?: 500);
    }
    
    return parent::render($request, $exception);
}
```

### Throwing Exceptions

```php
throw new Exception('User not found', 404);
throw new ValidationException($validator);
abort(403, 'Unauthorized');
```

## Best Practices

### 1. Dependency Injection

```php
// ✅ Good - Inject dependencies
public function __construct(UserRepository $repository)
{
    $this->repository = $repository;
}

// ❌ Bad - Instantiate in method
public function index()
{
    $repository = new UserRepository();
}
```

### 2. Use Type Hints

```php
// ✅ Good
public function find(int $id): ?Model

// ❌ Bad
public function find($id)
```

### 3. Repository Pattern

```php
// ✅ Good - Use repository
$users = $this->repository->all();

// ❌ Bad - Query model directly in controller
$users = User::all();
```

### 4. Request Validation

```php
// ✅ Good - Use FormRequest
public function create(CreateRequest $request)

// ❌ Bad - Validate in controller
public function create(Request $request) {
    $request->validate([...]);
}
```

### 5. Transformers

```php
// ✅ Good - Use transformer
return $this->respondWithItem($user);

// ❌ Bad - Return model directly
return response()->json($user);
```

### 6. Error Messages

```php
// ✅ Good - Use translation keys
throw new Exception(__('messages.user.not_found'), 404);

// ❌ Bad - Hardcode messages
throw new Exception('User not found', 404);
```

### 7. Query Optimization

```php
// ✅ Good - Eager load relationships
$users = User::with('posts')->get();

// ❌ Bad - N+1 queries
$users = User::all();
foreach ($users as $user) {
    $user->posts; // N+1 problem
}
```

---

**Next**: Learn about the frontend architecture in the [Frontend Guide](./FRONTEND.md).

