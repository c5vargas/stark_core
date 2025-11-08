# Frontend Guide

Complete guide to the React frontend architecture, patterns, and implementation details.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Context Architecture](#context-architecture)
- [Components](#components)
- [Hooks](#hooks)
- [Actions](#actions)
- [Stores](#stores)
- [Routing](#routing)
- [State Management](#state-management)
- [Data Fetching](#data-fetching)
- [Forms](#forms)
- [Internationalization](#internationalization)
- [Styling](#styling)
- [Best Practices](#best-practices)

## Overview

The frontend is built with **React 19** and **TypeScript**, following a modular context-based architecture for scalability and maintainability.

### Technology Stack

- **React**: 19.2.0
- **TypeScript**: 5.9.3 (strict mode)
- **Build Tool**: Vite 7.2.2
- **Styling**: Tailwind CSS 4.1.17
- **State Management**: Zustand 5.0.8
- **Data Fetching**: React Query (TanStack Query) 5.90.7
- **Routing**: React Router DOM 7.9.5
- **i18n**: i18next 25.6.1
- **HTTP Client**: Axios 1.13.2

## Project Structure

```
resources/js/
├── App.tsx                        # Root application component
├── main.tsx                       # Application entry point
├── contexts/                      # Feature modules
│   ├── auth/                      # Authentication context
│   ├── dashboard/                 # Dashboard context
│   ├── settings/                  # Settings context
│   ├── user/                      # User management context
│   ├── landing/                   # Landing pages
│   └── shared/                    # Shared utilities
├── router/                        # Global routing
│   ├── router.tsx                 # Route definitions
│   └── guards/                    # Route guards
│       └── RequireAuth.tsx
├── i18n/                          # Internationalization
│   └── index.ts
├── styles/                        # Global styles
│   └── index.css
├── env.d.ts                       # Environment types
└── global.d.ts                    # Global type definitions
```

## Context Architecture

Each context is a **self-contained feature module** with its own structure:

```
contexts/[feature-name]/
├── pages/                         # Full page components
│   ├── UsersListPage.tsx
│   └── UserDetailPage.tsx
├── components/                    # Feature-specific components
│   ├── UserCard.tsx
│   └── UserForm.tsx
├── hooks/                         # Custom hooks
│   ├── useUsers.ts
│   └── useUserForm.ts
├── actions/                       # API calls
│   ├── getUsers.ts
│   ├── getUserById.ts
│   ├── updateUserById.ts
│   └── destroyUserById.ts
├── stores/                        # Zustand stores
│   └── userStore.ts
├── layouts/                       # Layout components
│   └── UserLayout.tsx
├── libs/                          # Types & utilities
│   ├── types.ts
│   └── utils/
│       └── formatters.ts
└── router/                        # Context routes
    └── index.tsx
```

### Context Responsibilities

| Folder | Purpose | Example |
|--------|---------|---------|
| `pages/` | Route-level components | `UsersListPage.tsx` |
| `components/` | Reusable UI components | `UserCard.tsx` |
| `hooks/` | Business logic & data fetching | `useUsers()` |
| `actions/` | API communication | `getUsers()` |
| `stores/` | Global state (Zustand) | `useUserStore` |
| `layouts/` | Page layouts | `UserLayout.tsx` |
| `libs/` | Types & utilities | `types.ts` |
| `router/` | Route configuration | `index.tsx` |

## Components

### Component Types

#### 1. Page Components
Full-page components that are route entry points.

**File**: `contexts/user/pages/UsersListPage.tsx`

```tsx
import { useUsersPage } from '../hooks/useUsersPage'
import UsersList from '../components/UsersList'
import Layout from '@/contexts/shared/components/Layout'

export const UsersListPage: React.FC = () => {
  const { users, isLoading, handleSearch, handlePagination } = useUsersPage()

  return (
    <Layout title="Users Management">
      <UsersList
        users={users}
        isLoading={isLoading}
        onSearch={handleSearch}
        onPaginate={handlePagination}
      />
    </Layout>
  )
}

export default UsersListPage
```

#### 2. Feature Components
Components specific to a feature context.

**File**: `contexts/user/components/UserCard.tsx`

```tsx
import { User } from '../libs/types'
import { statusBadge } from '../libs/utils/statusBadge'

interface UserCardProps {
  user: User
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <img 
          src={user.avatar} 
          alt={user.name}
          className="h-12 w-12 rounded-full"
        />
        <div className="flex-1">
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        <div className="flex gap-2">
          {statusBadge(user.status)}
          <button onClick={() => onEdit(user.id)}>Edit</button>
          <button onClick={() => onDelete(user.id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}
```

#### 3. Shared Components
Reusable components in `contexts/shared/components/`.

**File**: `contexts/shared/components/Button.tsx`

```tsx
import clsx from 'clsx'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  type = 'button',
}) => {
  const baseClasses = 'rounded font-medium transition-colors'
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      {children}
    </button>
  )
}
```

### Component Best Practices

✅ **DO**:
- Use TypeScript interfaces for props
- Keep components focused (single responsibility)
- Use `clsx` for conditional classes
- Export component and props interface
- Use functional components with hooks
- Destructure props in component signature

❌ **DON'T**:
- Fetch data directly in components (use hooks)
- Put business logic in components
- Use inline styles (use Tailwind)
- Create deep component hierarchies
- Use default exports for non-page components

## Hooks

Custom hooks encapsulate business logic and make it reusable.

### Data Fetching Hook

**File**: `contexts/user/hooks/useUsersPage.ts`

```tsx
import { usePaginatedSearch } from '@/contexts/shared/hooks/usePaginatedQuery'
import getUsers from '../actions/getUsers'
import { User } from '../libs/types'

export const useUsersPage = () => {
  const {
    data: users,
    isLoading,
    error,
    page,
    perPage,
    handlePagination,
    handleSearch,
    refetch,
  } = usePaginatedSearch<User>({
    queryKeyString: 'users',
    perPage: 15,
    debounceMs: 400,
    queryFn: getUsers,
  })

  return {
    users,
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

### Form Hook

**File**: `contexts/shared/hooks/useForm.tsx`

```tsx
import { useState } from 'react'

interface UseFormOptions<T> {
  initialValues: T
  onSubmit: (values: T) => Promise<void>
  validate?: (values: T) => Record<string, string>
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
}: UseFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field as string]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field as string]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    
    // Validate if validation function provided
    if (validate) {
      const validationErrors = validate(values)
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }
    }

    setIsSubmitting(true)
    try {
      await onSubmit(values)
      setValues(initialValues) // Reset form
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setValues,
    setErrors,
  }
}
```

### Shared Utility Hooks

#### usePaginatedSearch

**File**: `contexts/shared/hooks/usePaginatedQuery.ts`

```tsx
import { useState } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import useDebounce from '@/contexts/shared/hooks/useDebounce'

type PaginationParams = {
  page: number
  perPage: number
  query?: string
}

type UsePaginatedSearchOptions<T> = {
  queryKeyString: string
  perPage?: number
  debounceMs?: number
  queryFn: (params: PaginationParams) => Promise<T[]>
}

export const usePaginatedSearch = <T>({
  queryKeyString,
  perPage = 15,
  debounceMs = 400,
  queryFn,
}: UsePaginatedSearchOptions<T>) => {
  const [query, setQuery] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const debouncedQuery = useDebounce(query, debounceMs)

  const queryResult: UseQueryResult<T[], unknown> = useQuery({
    queryKey: [queryKeyString, page, perPage, debouncedQuery],
    queryFn: () => queryFn({ page, perPage, query: debouncedQuery }),
  })

  const { data, isLoading, error, refetch } = queryResult
  const items: T[] = data ?? []

  const handleSearch = (val: string) => {
    setQuery(val)
    setPage(1)
  }

  const handlePagination = (sum: number) => {
    setPage(prev => Math.max(1, prev + sum))
  }

  return {
    data: items,
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

#### useDebounce

**File**: `contexts/shared/hooks/useDebounce.ts`

```tsx
import { useEffect, useState } from 'react'

const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
```

## Actions

Actions handle API communication and data transformation.

### Standard Action Pattern

**File**: `contexts/user/actions/getUsers.ts`

```tsx
import client from '@/contexts/shared/libs/api/httpAxios'
import formatPayload from '@/contexts/shared/libs/formatPayload'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'
import { User } from '@/contexts/user/libs/types'

interface IGetUsers {
  perPage: number
  page: number
  query?: string
}

const getUsers = async (payload: IGetUsers): Promise<User[]> => {
  try {
    const formData = formatPayload(payload)
    const response = await client.get<HTTPResultsResponse<User[]>>(
      '/api/users',
      formData
    )
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default getUsers
```

### CRUD Action Examples

**Create:**
```tsx
const createUser = async (data: CreateUserPayload): Promise<User> => {
  try {
    const response = await client.post<HTTPResultsResponse<User>>(
      '/api/users',
      data
    )
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}
```

**Update:**
```tsx
const updateUserById = async (
  id: number,
  data: UpdateUserPayload
): Promise<void> => {
  try {
    await client.post<HTTPMessageResponse>(
      `/api/users/${id}`,
      data
    )
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}
```

**Delete:**
```tsx
const destroyUserById = async (id: number): Promise<void> => {
  try {
    await client.delete<HTTPMessageResponse>(`/api/users/${id}`)
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}
```

### HTTP Client

**File**: `contexts/shared/libs/api/httpAxios.ts`

The HTTP client is an Axios instance with interceptors:

```tsx
import axios from 'axios'
import { tokenInitialState } from '@/contexts/auth/stores/authStore'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor - Add auth token
client.interceptors.request.use(
  config => {
    const token = tokenInitialState || localStorage.getItem('__auth__')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// Response interceptor - Handle errors globally
client.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

export default client
```

## Stores

Zustand stores manage global application state.

### Auth Store Example

**File**: `contexts/auth/stores/authStore.ts`

```tsx
import { create } from 'zustand'
import { Auth, CredentialsType } from '../libs/types'
import loginAuth from '../actions/loginAuth'
import getAuth from '../actions/getAuth'
import { isErrorWithMessage } from '@/contexts/shared/libs/isErrorWithMessage'

export const tokenInitialState = window.localStorage.getItem('__auth__') || ''

interface AuthState {
  user: Auth | null
  token: string
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  login: (credentials: CredentialsType) => Promise<boolean>
  logout: () => void
  getAuth: () => Promise<boolean>
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: tokenInitialState,
  isAuthenticated: tokenInitialState !== '',
  loading: false,
  error: null,

  login: async (credentials: CredentialsType) => {
    set({ loading: true, error: null })
    try {
      const { results, status } = await loginAuth(credentials)
      const { token, user } = results

      if (!status) {
        return false
      }

      if (token) window.localStorage.setItem('__auth__', token)

      set({ user, token, isAuthenticated: true, loading: false })

      return !!status
    } catch (error: unknown) {
      if (isErrorWithMessage(error)) {
        set({ error: error.message, loading: false })
      } else {
        set({ error: 'An error has occurred', loading: false })
      }
      return false
    }
  },

  logout: () => {
    window.localStorage.removeItem('__auth__')
    set({ user: null, token: '', isAuthenticated: false })
  },

  getAuth: async () => {
    set({ loading: true, error: null })
    try {
      const { results, status } = await getAuth()
      const user = results.data

      if (status !== 201) throw new Error('No token received')

      set({ user, isAuthenticated: true, loading: false })
      return true
    } catch (error: unknown) {
      if (isErrorWithMessage(error)) {
        set({ error: error.message, loading: false })
      }
    }
    return false
  },
}))
```

### Using Stores in Components

```tsx
import { useAuthStore } from '@/contexts/auth/stores/authStore'

export const UserProfile: React.FC = () => {
  const { user, logout } = useAuthStore()

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

## Routing

### Global Router

**File**: `router/router.tsx`

```tsx
import { lazy } from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import RequireAuth from './guards/RequireAuth'

import usersRouter from '@/contexts/user/router'
import settingsRouter from '@/contexts/settings/router'

const DashboardPage = lazy(() => import('@/contexts/dashboard/pages/DashboardPage'))
const LoginPage = lazy(() => import('@/contexts/auth/pages/LoginPage'))
const HomePage = lazy(() => import('@/contexts/landing/pages/HomePage'))

const Router = createBrowserRouter([
  {
    path: ':lang?',
    element: <HomePage />,
  },
  {
    path: ':lang?/auth',
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: ':lang?/dashboard',
    element: (
      <RequireAuth>
        <Outlet />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      { ...usersRouter },
      { ...settingsRouter },
    ],
  },
])

export default Router
```

### Context Router

**File**: `contexts/user/router/index.tsx`

```tsx
import { lazy } from 'react'
import { Outlet } from 'react-router-dom'
import UserLayout from '../layouts/UserLayout'

const UsersListPage = lazy(() => import('../pages/UsersListPage'))
const UserDetailPage = lazy(() => import('../pages/UserDetailPage'))

const usersRouter = {
  path: 'users',
  element: (
    <UserLayout>
      <Outlet />
    </UserLayout>
  ),
  children: [
    {
      index: true,
      element: <UsersListPage />,
    },
    {
      path: ':id',
      element: <UserDetailPage />,
    },
  ],
}

export default usersRouter
```

### Route Guards

**File**: `router/guards/RequireAuth.tsx`

```tsx
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/contexts/auth/stores/authStore'

interface RequireAuthProps {
  children: React.ReactNode
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  return <>{children}</>
}

export default RequireAuth
```

## State Management

### When to Use Each Solution

| Solution | Use Case | Example |
|----------|----------|---------|
| **Component State** | UI state, form inputs | Toggle, modal open/close |
| **React Query** | Server state, caching | API data, paginated lists |
| **Zustand** | Global client state | Auth, theme, sidebar state |

### React Query (TanStack Query)

For server state management:

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Fetch data
const { data, isLoading, error } = useQuery({
  queryKey: ['users', page],
  queryFn: () => getUsers({ page }),
})

// Mutate data
const queryClient = useQueryClient()
const mutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})
```

## Forms

### Using useForm Hook

```tsx
import { useForm } from '@/contexts/shared/hooks/useForm'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { Button } from '@/contexts/shared/components/Button'

interface FormValues {
  name: string
  email: string
  password: string
}

export const UserForm: React.FC = () => {
  const { values, errors, isSubmitting, handleChange, handleSubmit } = 
    useForm<FormValues>({
      initialValues: {
        name: '',
        email: '',
        password: '',
      },
      onSubmit: async (values) => {
        await createUser(values)
      },
      validate: (values) => {
        const errors: Record<string, string> = {}
        if (!values.name) errors.name = 'Name is required'
        if (!values.email) errors.email = 'Email is required'
        return errors
      },
    })

  return (
    <form onSubmit={handleSubmit}>
      <InputText
        label="Name"
        value={values.name}
        onChange={e => handleChange('name', e.target.value)}
        error={errors.name}
      />
      <InputText
        label="Email"
        type="email"
        value={values.email}
        onChange={e => handleChange('email', e.target.value)}
        error={errors.email}
      />
      <InputText
        label="Password"
        type="password"
        value={values.password}
        onChange={e => handleChange('password', e.target.value)}
        error={errors.password}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  )
}
```

## Internationalization

### Using i18next

**Setup**: `i18n/index.ts`

```tsx
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          'welcome': 'Welcome',
          'users.title': 'Users Management',
          'users.create': 'Create User',
        },
      },
    },
  })

export default i18n
```

**Usage in Components:**

```tsx
import { useTranslation } from 'react-i18next'

export const UsersPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('users.title')}</h1>
      <button>{t('users.create')}</button>
    </div>
  )
}
```

## Styling

### Tailwind CSS

Use utility classes for all styling:

```tsx
<div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
  <img className="h-12 w-12 rounded-full" />
  <div className="flex-1">
    <h3 className="text-lg font-semibold">Title</h3>
    <p className="text-sm text-gray-600">Description</p>
  </div>
</div>
```

### Conditional Classes with clsx

```tsx
import clsx from 'clsx'

<button
  className={clsx(
    'rounded px-4 py-2',
    isActive && 'bg-blue-600 text-white',
    !isActive && 'bg-gray-200 text-gray-900',
    disabled && 'cursor-not-allowed opacity-50'
  )}
>
  Click me
</button>
```

## Best Practices

### 1. TypeScript

```tsx
// ✅ Good - Explicit types
interface User {
  id: number
  name: string
  email: string
}

const getUser = async (id: number): Promise<User> => { ... }

// ❌ Bad - Any types
const getUser = async (id: any): Promise<any> => { ... }
```

### 2. Component Organization

```tsx
// ✅ Good - Props interface, functional component
interface UserCardProps {
  user: User
  onEdit: (id: number) => void
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  return <div>...</div>
}

// ❌ Bad - No types, inline props
export const UserCard = (props) => {
  return <div>...</div>
}
```

### 3. Data Fetching

```tsx
// ✅ Good - Use custom hooks
const { users, isLoading } = useUsers()

// ❌ Bad - Fetch in component
useEffect(() => {
  fetch('/api/users').then(...)
}, [])
```

### 4. State Management

```tsx
// ✅ Good - Choose appropriate solution
const [modalOpen, setModalOpen] = useState(false) // Component state
const { data } = useQuery(['users'], getUsers)    // Server state
const { user } = useAuthStore()                   // Global state

// ❌ Bad - Everything in Zustand
const { modalOpen, users, user } = useGlobalStore()
```

### 5. Imports

```tsx
// ✅ Good - Absolute imports with aliases
import { Button } from '@/contexts/shared/components/Button'
import { useUsers } from '@/contexts/user/hooks/useUsers'

// ❌ Bad - Relative imports
import { Button } from '../../../shared/components/Button'
```

---

**Next**: Learn how to implement new features in the [New Feature Guide](./NEW_FEATURE_GUIDE.md).

