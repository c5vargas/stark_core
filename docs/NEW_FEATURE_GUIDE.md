# New Feature Implementation Guide

Step-by-step guide for implementing new features in Stark Core, following established patterns and best practices.

## Table of Contents

- [Overview](#overview)
- [Planning Phase](#planning-phase)
- [Backend Implementation](#backend-implementation)
- [Frontend Implementation](#frontend-implementation)
- [Integration & Testing](#integration--testing)
- [Example: Blog Feature](#example-blog-feature)
- [Checklist](#checklist)

## Overview

This guide walks you through implementing a complete feature from backend to frontend, following the Repository Pattern on the backend and Context Architecture on the frontend.

### Development Flow

```
1. Planning → Define requirements, data structure, API endpoints
2. Database → Create migrations and models
3. Backend → Repository, Controller, Requests, Transformer
4. Frontend → Context structure, Actions, Hooks, Components, Pages
5. Integration → Routes, Testing, Documentation
```

## Planning Phase

### 1. Define Requirements

Document what the feature should do:

**Example: Blog Feature**

- Users can create, read, update, and delete blog posts
- Posts have title, content, author, status, and publish date
- Posts can be filtered by status and author
- Posts support pagination and search

### 2. Design Data Structure

Plan your database schema:

```
posts table:
- id (primary key)
- user_id (foreign key)
- title (string)
- slug (string, unique)
- content (text)
- excerpt (text, nullable)
- status (enum: draft, published, archived)
- published_at (timestamp, nullable)
- created_at (timestamp)
- updated_at (timestamp)
```

### 3. Define API Endpoints

Plan your REST API:

```
GET    /api/posts          - List posts (paginated, searchable)
GET    /api/posts/{id}     - Get single post
POST   /api/posts          - Create new post
POST   /api/posts/{id}     - Update post
DELETE /api/posts/{id}     - Delete post
```

### 4. Identify Permissions

Define who can do what:

```
- view.posts    - View published posts (all users)
- create.posts  - Create new posts (authenticated users)
- edit.posts    - Edit own posts (authors)
- edit.all.posts - Edit any post (editors/admins)
- delete.posts  - Delete own posts (authors)
- delete.all.posts - Delete any post (admins)
```

## Backend Implementation

### Step 1: Create Migration

**Command:**

```bash
php artisan make:migration create_posts_table
```

**File**: `database/migrations/YYYY_MM_DD_HHMMSS_create_posts_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('content');
            $table->text('excerpt')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])
                  ->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            // Indexes for performance
            $table->index('status');
            $table->index('user_id');
            $table->index('published_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
```

**Run migration:**

```bash
php artisan migrate
```

### Step 2: Create Enum (Optional)

**Command:**

```bash
php artisan make:enum PostStatus
```

**File**: `app/Enums/PostStatus.php`

```php
<?php

namespace App\Enums;

enum PostStatus: string
{
    case DRAFT = 'draft';
    case PUBLISHED = 'published';
    case ARCHIVED = 'archived';
}
```

### Step 3: Create Model

**Command:**

```bash
php artisan make:model Post
```

**File**: `app/Models/Post.php`

```php
<?php

namespace App\Models;

use App\Enums\PostStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'content',
        'excerpt',
        'status',
        'published_at',
    ];

    protected $casts = [
        'status' => PostStatus::class,
        'published_at' => 'datetime',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('status', PostStatus::PUBLISHED)
                     ->whereNotNull('published_at')
                     ->where('published_at', '<=', now());
    }

    public function scopeByAuthor($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    // Mutators
    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    // Helpers
    public function isPublished(): bool
    {
        return $this->status === PostStatus::PUBLISHED;
    }
}
```

### Step 4: Create Repository

**File**: `app/Repositories/PostRepositoryInterface.php`

```php
<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface PostRepositoryInterface extends EloquentRepositoryInterface
{
    public function paginate(array $params);
    public function findBySlug(string $slug): ?Model;
}
```

**File**: `app/Repositories/Eloquent/PostRepository.php`

```php
<?php

namespace App\Repositories\Eloquent;

use App\Models\Post;
use App\Repositories\PostRepositoryInterface;

class PostRepository extends BaseRepository implements PostRepositoryInterface
{
    public function __construct(Post $model)
    {
        parent::__construct($model);
    }

    public function paginate(array $params)
    {
        $query = $this->model->query()->with('user');

        // Search
        if (isset($params['query']) && !empty($params['query'])) {
            $query->where(function($q) use ($params) {
                $q->where('title', 'like', '%' . $params['query'] . '%')
                  ->orWhere('content', 'like', '%' . $params['query'] . '%');
            });
        }

        // Filter by status
        if (isset($params['status'])) {
            $query->where('status', $params['status']);
        }

        // Filter by author
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

    public function findBySlug(string $slug): ?Post
    {
        return $this->model->where('slug', $slug)->first();
    }
}
```

**Register in Provider**: `app/Providers/RepositoryServiceProvider.php`

```php
public function register()
{
    $this->app->bind(EloquentRepositoryInterface::class, BaseRepository::class);
    $this->app->bind(PostRepositoryInterface::class, PostRepository::class);
}
```

### Step 5: Create Request Validations

**Create Request:**

```bash
php artisan make:request Api/Post/CreateRequest
```

**File**: `app/Http/Requests/Api/Post/CreateRequest.php`

```php
<?php

namespace App\Http\Requests\Api\Post;

use App\Enums\PostStatus;
use App\Http\Requests\Api\FormRequest;
use Illuminate\Validation\Rules\Enum;

class CreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->can('create.posts');
    }

    public function rules(): array
    {
        return [
            'title'        => 'required|string|min:3|max:255',
            'content'      => 'required|string|min:10',
            'excerpt'      => 'nullable|string|max:500',
            'status'       => ['required', new Enum(PostStatus::class)],
            'published_at' => 'nullable|date',
        ];
    }
}
```

**Update Request:**

```bash
php artisan make:request Api/Post/UpdateRequest
```

**File**: `app/Http/Requests/Api/Post/UpdateRequest.php`

```php
<?php

namespace App\Http\Requests\Api\Post;

use App\Enums\PostStatus;
use App\Http\Requests\Api\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = auth()->user();
        $postId = $this->route('id');
        $post = \App\Models\Post::find($postId);

        // User can edit their own posts or has edit.all.posts permission
        return $user->can('edit.posts') && $post->user_id === $user->id
            || $user->can('edit.all.posts');
    }

    public function rules(): array
    {
        return [
            'id'           => 'required|exists:posts,id',
            'title'        => 'sometimes|string|min:3|max:255',
            'content'      => 'sometimes|string|min:10',
            'excerpt'      => 'nullable|string|max:500',
            'status'       => ['sometimes', new Enum(PostStatus::class)],
            'published_at' => 'nullable|date',
        ];
    }
}
```

### Step 6: Create Transformer

**File**: `app/Http/Transformers/PostTransformer.php`

```php
<?php

namespace App\Http\Transformers;

use App\Models\Post;
use League\Fractal\TransformerAbstract;

class PostTransformer extends TransformerAbstract
{
    protected array $availableIncludes = [
        'user',
    ];

    public function transform(Post $post)
    {
        return [
            'id'           => $post->id,
            'user_id'      => $post->user_id,
            'title'        => $post->title,
            'slug'         => $post->slug,
            'content'      => $post->content,
            'excerpt'      => $post->excerpt,
            'status'       => $post->status instanceof \BackedEnum
                               ? $post->status->value
                               : $post->status,
            'published_at' => $post->published_at?->toISOString(),
            'created_at'   => $post->created_at->toISOString(),
            'updated_at'   => $post->updated_at->toISOString(),
        ];
    }

    public function includeUser(Post $post)
    {
        if ($post->user) {
            return $this->item($post->user, new UserTransformer());
        }
    }
}
```

### Step 7: Create Controller

**Command:**

```bash
php artisan make:controller PostController
```

**File**: `app/Http/Controllers/PostController.php`

```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\Api\Post\CreateRequest;
use App\Http\Requests\Api\Post\UpdateRequest;
use App\Http\Transformers\PostTransformer;
use App\Repositories\Eloquent\PostRepository;
use Exception;
use Illuminate\Http\Request;

class PostController extends Controller
{
    private $repository;

    public function __construct(
        PostTransformer $transformer,
        PostRepository $repository,
        Request $request
    ){
        parent::__construct($transformer, $request);
        $this->repository = $repository;
    }

    public function index(Request $request)
    {
        $posts = $this->repository->paginate($request->all());
        return $this->respondWithCollection($posts);
    }

    public function show(int $id)
    {
        $post = $this->repository->find($id);
        return $this->respondWithItem($post);
    }

    public function create(CreateRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        $post = $this->repository->create($data);

        return $this->respondWithItem(
            $post,
            201,
            __('messages.controller.post.created')
        );
    }

    public function update(UpdateRequest $request)
    {
        $updated = $this->repository->update(
            $request->validated(),
            $request->input('id')
        );

        if (!$updated) {
            throw new Exception(__('messages.controller.common.error_500'), 500);
        }

        return $this->respondWithMessage(__('messages.controller.post.updated'));
    }

    public function delete($id)
    {
        $post = $this->repository->find($id);

        // Authorization check
        if (!auth()->user()->can('delete.all.posts')
            && $post->user_id !== auth()->id()) {
            throw new Exception(__('messages.controller.common.unauthorized'), 403);
        }

        $deleted = $this->repository->delete($id);

        if (!$deleted) {
            throw new Exception(__('messages.controller.common.error_500'), 500);
        }

        return $this->respondWithMessage(__('messages.controller.post.deleted'));
    }
}
```

### Step 8: Add Routes

**File**: `routes/api.php`

```php
Route::middleware(['auth:sanctum', 'apply_locale'])->group(function() {
    Route::prefix('posts')->group(function () {
        Route::get('', [PostController::class, 'index']);
        Route::get('/{id}', [PostController::class, 'show']);
        Route::post('', [PostController::class, 'create']);
        Route::post('/{id}', [PostController::class, 'update']);
        Route::delete('/{id}', [PostController::class, 'delete']);
    });
});
```

## Frontend Implementation

### Step 1: Create Context Structure

```bash
# Create the context folder structure
mkdir -p resources/js/contexts/post/{actions,components,hooks,layouts,libs,pages,router}
mkdir -p resources/js/contexts/post/libs/utils
```

### Step 2: Define Types

**File**: `resources/js/contexts/post/libs/types.ts`

```typescript
export interface Post {
  id: number
  user_id: number
  title: string
  slug: string
  content: string
  excerpt: string | null
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
  created_at: string
  updated_at: string
  user?: {
    id: number
    name: string
    email: string
  }
}

export interface CreatePostPayload {
  title: string
  content: string
  excerpt?: string
  status: 'draft' | 'published' | 'archived'
  published_at?: string
}

export interface UpdatePostPayload extends Partial<CreatePostPayload> {
  id: number
}

export interface GetPostsParams {
  page: number
  perPage: number
  query?: string
  status?: string
  user_id?: number
}
```

### Step 3: Create Actions

**File**: `resources/js/contexts/post/actions/getPosts.ts`

```typescript
import client from '@/contexts/shared/libs/api/httpAxios'
import formatPayload from '@/contexts/shared/libs/formatPayload'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'
import { Post, GetPostsParams } from '../libs/types'

const getPosts = async (payload: GetPostsParams): Promise<Post[]> => {
  try {
    const formData = formatPayload(payload)
    const response = await client.get<HTTPResultsResponse<Post[]>>('/api/posts', formData)
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default getPosts
```

**File**: `resources/js/contexts/post/actions/getPostById.ts`

```typescript
import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'
import { Post } from '../libs/types'

const getPostById = async (id: number): Promise<Post> => {
  try {
    const response = await client.get<HTTPResultsResponse<Post>>(`/api/posts/${id}`)
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default getPostById
```

**File**: `resources/js/contexts/post/actions/createPost.ts`

```typescript
import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'
import { Post, CreatePostPayload } from '../libs/types'

const createPost = async (payload: CreatePostPayload): Promise<Post> => {
  try {
    const response = await client.post<HTTPResultsResponse<Post>>('/api/posts', payload)
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default createPost
```

**File**: `resources/js/contexts/post/actions/updatePostById.ts`

```typescript
import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPMessageResponse } from '@/contexts/shared/libs/types'
import { UpdatePostPayload } from '../libs/types'

const updatePostById = async (payload: UpdatePostPayload): Promise<void> => {
  try {
    await client.post<HTTPMessageResponse>(`/api/posts/${payload.id}`, payload)
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default updatePostById
```

**File**: `resources/js/contexts/post/actions/destroyPostById.ts`

```typescript
import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPMessageResponse } from '@/contexts/shared/libs/types'

const destroyPostById = async (id: number): Promise<void> => {
  try {
    await client.delete<HTTPMessageResponse>(`/api/posts/${id}`)
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default destroyPostById
```

### Step 4: Create Hooks

**File**: `resources/js/contexts/post/hooks/usePostsPage.ts`

```typescript
import { usePaginatedSearch } from '@/contexts/shared/hooks/usePaginatedQuery'
import getPosts from '../actions/getPosts'
import { Post } from '../libs/types'

export const usePostsPage = () => {
  const {
    data: posts,
    isLoading,
    error,
    page,
    perPage,
    handlePagination,
    handleSearch,
    refetch,
  } = usePaginatedSearch<Post>({
    queryKeyString: 'posts',
    perPage: 15,
    debounceMs: 400,
    queryFn: getPosts,
  })

  return {
    posts,
    isLoading,
    error,
    page,
    perPage,
    handlePagination,
    handleSearch,
    refetch,
  }
}
```

**File**: `resources/js/contexts/post/hooks/usePostDetail.ts`

```typescript
import { useQuery } from '@tanstack/react-query'
import getPostById from '../actions/getPostById'

export const usePostDetail = (id: number) => {
  const {
    data: post,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  })

  return {
    post,
    isLoading,
    error,
    refetch,
  }
}
```

### Step 5: Create Components

**File**: `resources/js/contexts/post/components/PostCard.tsx`

```typescript
import { Post } from '../libs/types'
import { formatDate } from '@/contexts/shared/utils/date'

interface PostCardProps {
  post: Post
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export const PostCard: React.FC<PostCardProps> = ({ post, onEdit, onDelete }) => {
  return (
    <article className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <p className="text-sm text-gray-600">
          By {post.user?.name} • {formatDate(post.created_at)}
        </p>
      </div>

      {post.excerpt && (
        <p className="mb-4 text-gray-700">{post.excerpt}</p>
      )}

      <div className="flex items-center justify-between">
        <span className={`rounded px-2 py-1 text-sm ${
          post.status === 'published'
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {post.status}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(post.id)}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}
```

### Step 6: Create Pages

**File**: `resources/js/contexts/post/pages/PostsListPage.tsx`

```typescript
import { usePostsPage } from '../hooks/usePostsPage'
import { PostCard } from '../components/PostCard'
import Layout from '@/contexts/shared/components/Layout'
import Loading from '@/contexts/shared/components/Loading'
import { useNavigate } from 'react-router-dom'

export const PostsListPage: React.FC = () => {
  const navigate = useNavigate()
  const { posts, isLoading, handleSearch, handlePagination, page } = usePostsPage()

  if (isLoading) return <Loading />

  return (
    <Layout title="Blog Posts">
      <div className="mb-6 flex items-center justify-between">
        <input
          type="search"
          placeholder="Search posts..."
          onChange={(e) => handleSearch(e.target.value)}
          className="rounded border px-4 py-2"
        />
        <button
          onClick={() => navigate('/dashboard/posts/create')}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Create Post
        </button>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={(id) => navigate(`/dashboard/posts/${id}`)}
            onDelete={(id) => {
              // Handle delete with confirmation
              if (confirm('Delete this post?')) {
                // Call delete action
              }
            }}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => handlePagination(-1)}
          disabled={page === 1}
          className="rounded bg-gray-200 px-4 py-2"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          onClick={() => handlePagination(1)}
          className="rounded bg-gray-200 px-4 py-2"
        >
          Next
        </button>
      </div>
    </Layout>
  )
}

export default PostsListPage
```

### Step 7: Create Router

**File**: `resources/js/contexts/post/router/index.tsx`

```typescript
import { lazy } from 'react'
import { Outlet } from 'react-router-dom'

const PostsListPage = lazy(() => import('../pages/PostsListPage'))
const PostDetailPage = lazy(() => import('../pages/PostDetailPage'))
const PostCreatePage = lazy(() => import('../pages/PostCreatePage'))

const postsRouter = {
  path: 'posts',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <PostsListPage />,
    },
    {
      path: 'create',
      element: <PostCreatePage />,
    },
    {
      path: ':id',
      element: <PostDetailPage />,
    },
  ],
}

export default postsRouter
```

### Step 8: Register in Global Router

**File**: `resources/js/router/router.tsx`

```typescript
import postsRouter from '@/contexts/post/router'

const Router = createBrowserRouter([
  // ... existing routes
  {
    path: ':lang?/dashboard',
    element: (
      <RequireAuth>
        <Outlet />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { ...usersRouter },
      { ...settingsRouter },
      { ...postsRouter }, // Add new router
    ],
  },
])
```

## Integration & Testing

### 1. Test Backend Endpoints

Use Postman, Insomnia, or curl:

```bash
# List posts
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:8000/api/posts

# Create post
curl -X POST \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"title":"Test Post","content":"Content here","status":"draft"}' \
     http://localhost:8000/api/posts
```

### 2. Test Frontend

```bash
npm run dev
# Visit http://localhost:5173/dashboard/posts
```

### 3. Add Permissions

In your PermissionsSeeder or database:

```php
Permission::create(['name' => 'view.posts']);
Permission::create(['name' => 'create.posts']);
Permission::create(['name' => 'edit.posts']);
Permission::create(['name' => 'edit.all.posts']);
Permission::create(['name' => 'delete.posts']);
Permission::create(['name' => 'delete.all.posts']);
```

Assign to roles:

```php
$role = Role::findByName('admin');
$role->givePermissionTo([
    'view.posts',
    'create.posts',
    'edit.all.posts',
    'delete.all.posts',
]);
```

## Example: Blog Feature

Complete file structure for the blog feature:

```
Backend:
├── database/migrations/
│   └── YYYY_MM_DD_create_posts_table.php
├── app/
│   ├── Enums/
│   │   └── PostStatus.php
│   ├── Models/
│   │   └── Post.php
│   ├── Repositories/
│   │   ├── PostRepositoryInterface.php
│   │   └── Eloquent/
│   │       └── PostRepository.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── PostController.php
│   │   ├── Requests/Api/Post/
│   │   │   ├── CreateRequest.php
│   │   │   └── UpdateRequest.php
│   │   └── Transformers/
│   │       └── PostTransformer.php

Frontend:
└── resources/js/contexts/post/
    ├── actions/
    │   ├── getPosts.ts
    │   ├── getPostById.ts
    │   ├── createPost.ts
    │   ├── updatePostById.ts
    │   └── destroyPostById.ts
    ├── components/
    │   ├── PostCard.tsx
    │   ├── PostForm.tsx
    │   └── PostList.tsx
    ├── hooks/
    │   ├── usePostsPage.ts
    │   ├── usePostDetail.ts
    │   └── usePostForm.ts
    ├── pages/
    │   ├── PostsListPage.tsx
    │   ├── PostDetailPage.tsx
    │   └── PostCreatePage.tsx
    ├── libs/
    │   ├── types.ts
    │   └── utils/
    └── router/
        └── index.tsx
```

## Checklist

Use this checklist when implementing a new feature:

### Backend

- [ ] Create migration with proper indexes
- [ ] Create Enum (if applicable)
- [ ] Create Model with relationships, scopes, casts
- [ ] Create Repository Interface
- [ ] Create Repository Implementation
- [ ] Register Repository in RepositoryServiceProvider
- [ ] Create FormRequest classes (Create/Update)
- [ ] Create Transformer
- [ ] Create Controller
- [ ] Add routes to `routes/api.php`
- [ ] Create permissions
- [ ] Test endpoints with Postman/curl

### Frontend

- [ ] Create context folder structure
- [ ] Define TypeScript types
- [ ] Create action functions (CRUD)
- [ ] Create custom hooks
- [ ] Create components
- [ ] Create pages
- [ ] Create router configuration
- [ ] Register router in global router
- [ ] Test in browser
- [ ] Add translations (i18n)

### Integration

- [ ] Test full flow (create, read, update, delete)
- [ ] Test authorization (permissions)
- [ ] Test validation (frontend & backend)
- [ ] Test error handling
- [ ] Code review
- [ ] Update documentation (if needed)

---

**Next**: Review [API Standards](./API_STANDARDS.md) for API design conventions.
