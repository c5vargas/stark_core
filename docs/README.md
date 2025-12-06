# Stark Core Documentation

Welcome to the Stark Core project documentation. This comprehensive guide will help developers and AI assistants understand the project architecture, implement new features, and maintain code quality standards.

## 📚 Documentation Structure

This documentation is organized into the following sections:

### Core Documentation

- **[Architecture Overview](./ARCHITECTURE.md)** - High-level system architecture and design patterns
- **[Backend Guide](./BACKEND.md)** - Complete Laravel backend documentation
- **[Frontend Guide](./FRONTEND.md)** - Complete React frontend documentation
- **[Workflow Guide](./WORKFLOW.md)** - Development workflows and processes

### Implementation Guides

- **[New Feature Guide](./NEW_FEATURE_GUIDE.md)** - Step-by-step guide for implementing new features
- **[API Standards](./API_STANDARDS.md)** - API design and implementation standards
- **[Testing Guide](./TESTING.md)** - Testing strategies and best practices
- **[Deployment Guide](./DEPLOYMENT.md)** - Deployment and production setup

### Feature-Specific Guides

- **[Analytics Integration](./ANALYTICS.md)** - Google Analytics setup and usage

## 🚀 Quick Start

### Technology Stack

**Backend:**

- Laravel 12.x (PHP 8.3+)
- MySQL/PostgreSQL
- Laravel Sanctum (Authentication)
- Spatie Permissions (Authorization)
- League Fractal (API Transformations)

**Frontend:**

- React 19 + TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- Zustand (State management)
- React Query (Data fetching)
- React Router DOM v7 (Routing)
- i18next (Internationalization)

### Essential Commands

```bash
# Installation
composer install && npm install

# Development
npm run start         # Start Laravel server + Vite
npm run dev           # Frontend only (Vite)

# Production
npm run build         # Production build

# Code Quality
npm run lint          # ESLint for JS/TS/TSX
npm run format:write  # Format code with Prettier
npm run format:check  # Check code format

# Testing
php artisan test      # Backend tests
npm run test          # Frontend tests
```

## 🏗️ Project Structure

```
stark_core/
├── app/                    # Laravel backend
│   ├── Http/
│   │   ├── Controllers/    # API Controllers
│   │   ├── Middleware/     # Custom middleware
│   │   ├── Requests/       # Validation classes
│   │   └── Transformers/   # Fractal transformers
│   ├── Models/             # Eloquent models
│   ├── Repositories/       # Repository pattern
│   └── Services/           # Business logic services
├── resources/js/           # React frontend
│   ├── contexts/           # Feature modules (see below)
│   ├── router/             # Routing configuration
│   └── i18n/               # Translations
├── routes/                 # API and web routes
├── database/               # Migrations and seeders
└── DOCS/                   # This documentation
```

### Frontend Context Structure

Each feature is organized as a self-contained context:

```
contexts/[feature-name]/
├── actions/      # API calls and async operations
├── components/   # React components specific to this feature
├── hooks/        # Custom React hooks
├── layouts/      # Layout components
├── libs/         # Types, utilities, and constants
├── pages/        # Full page components
├── router/       # Feature routing configuration
└── stores/       # Zustand state stores
```

**Available Contexts:**

- `auth` - Authentication and authorization
- `dashboard` - Main dashboard with analytics
- `settings` - System configuration
- `user` - User management
- `shared` - Shared components and utilities

## 🎯 Key Concepts

### Backend Architecture

The backend follows a **Repository Pattern** with clean separation of concerns:

1. **Routes** → Define API endpoints
2. **Controllers** → Coordinate request/response flow
3. **Request Validation** → Validate and authorize incoming data
4. **Repositories** → Handle data access and persistence
5. **Transformers** → Format API responses
6. **Services** → Encapsulate complex business logic

### Frontend Architecture

The frontend uses a **modular context-based architecture**:

1. **Pages** → Full page components with routing
2. **Hooks** → Encapsulate reusable logic and data fetching
3. **Actions** → API communication layer
4. **Stores** → Global state management with Zustand
5. **Components** → Reusable UI components

### Data Flow

```
Frontend Request
    ↓
React Query (usePaginatedSearch/useQuery)
    ↓
Action (API call via httpAxios)
    ↓
Backend Route
    ↓
Middleware (auth, locale)
    ↓
Controller Method
    ↓
Request Validation (authorize + rules)
    ↓
Repository Method
    ↓
Model/Database
    ↓
Transformer (format response)
    ↓
Controller Response
    ↓
Frontend State Update
```

## 📋 Development Guidelines

### Code Standards

- **PHP**: PSR-12, Laravel Pint for formatting
- **TypeScript**: Strict mode enabled
- **React**: Functional components with hooks
- **CSS**: Tailwind utility classes (avoid custom CSS)
- **Git**: Conventional commits, pre-commit hooks with Husky

### Best Practices

1. **Always use TypeScript** - No plain JavaScript files
2. **Follow the Repository Pattern** - Don't query models directly in controllers
3. **Validate all inputs** - Use FormRequest classes
4. **Transform all responses** - Use Fractal transformers
5. **Modular architecture** - Keep features in separate contexts
6. **Reusable hooks** - Extract logic into custom hooks
7. **Global state wisely** - Use Zustand for shared state only
8. **Internationalization** - Use i18next for all user-facing text

## 🔍 Where to Go Next

- **New to the project?** → Start with [Architecture Overview](./ARCHITECTURE.md)
- **Building a new feature?** → Read [New Feature Guide](./NEW_FEATURE_GUIDE.md)
- **Working on the backend?** → Check [Backend Guide](./BACKEND.md)
- **Working on the frontend?** → Check [Frontend Guide](./FRONTEND.md)
- **Need API specifications?** → See [API Standards](./API_STANDARDS.md)
- **Setting up Analytics?** → Review [Analytics Integration](./ANALYTICS.md)

## 🎨 Features

### Analytics & Metrics

Stark Core includes built-in Google Analytics integration:

- **Dashboard Analytics** - Real-time metrics and charts
- **Page View Tracking** - Automatic tracking of all routes
- **Custom Events** - Track user interactions and conversions
- **Top Pages** - Most visited pages with statistics
- **Real-Time Visitors** - Live user count

See [Analytics Integration Guide](./ANALYTICS.md) for complete setup instructions.

### User Management

- Complete CRUD operations for users
- Role-based access control (RBAC)
- Permission management with Spatie
- User profiles and authentication

### Settings Management

- Application configuration
- Mail settings with test functionality
- Localization and translations
- Google Analytics configuration
- GDPR compliance settings

## 🤝 Contributing

When implementing new features or making changes:

1. Follow the established patterns and conventions
2. Write comprehensive tests
3. Update documentation if needed
4. Run linters and formatters before committing
5. Use conventional commit messages

## 📞 Support

For questions or issues:

- Check the relevant documentation section
- Review existing code examples
- Consult the team leads

---

**Last Updated**: November 2025  
**Version**: 1.0.0
