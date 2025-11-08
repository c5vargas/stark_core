# Development Workflow

This guide outlines the development workflows, processes, and best practices for contributing to Stark Core.

## Table of Contents

- [Development Environment](#development-environment)
- [Git Workflow](#git-workflow)
- [Code Quality](#code-quality)
- [Feature Development](#feature-development)
- [Bug Fixes](#bug-fixes)
- [Code Review](#code-review)
- [Database Changes](#database-changes)
- [Deployment Process](#deployment-process)

## Development Environment

### Initial Setup

1. **Clone Repository**

```bash
git clone <repository-url>
cd stark_core
```

2. **Install Dependencies**

```bash
# Backend dependencies
composer install

# Frontend dependencies
npm install
```

3. **Environment Configuration**

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=stark_core
DB_USERNAME=root
DB_PASSWORD=
```

4. **Database Setup**

```bash
# Run migrations
php artisan migrate

# Seed database (optional)
php artisan db:seed
```

5. **Start Development Server**

```bash
# Start both Laravel and Vite
npm run start

# Or separately:
# Terminal 1: Laravel
php artisan serve

# Terminal 2: Vite
npm run dev
```

### Daily Development

```bash
# Pull latest changes
git pull origin dev

# Install any new dependencies
composer install && npm install

# Run migrations
php artisan migrate

# Start development server
npm run start
```

## Git Workflow

### Branch Strategy

```
main/master     - Production-ready code
  └── dev       - Development branch
      ├── feature/user-management
      ├── feature/blog-module
      ├── bugfix/login-issue
      └── hotfix/critical-bug
```

### Branch Naming Conventions

| Type     | Format                 | Example                    |
| -------- | ---------------------- | -------------------------- |
| Feature  | `feature/description`  | `feature/user-management`  |
| Bug Fix  | `bugfix/description`   | `bugfix/login-validation`  |
| Hotfix   | `hotfix/description`   | `hotfix/security-patch`    |
| Refactor | `refactor/description` | `refactor/user-repository` |
| Docs     | `docs/description`     | `docs/api-documentation`   |

### Creating a Feature Branch

```bash
# Start from dev branch
git checkout dev
git pull origin dev

# Create feature branch
git checkout -b feature/blog-module

# Work on your feature...

# Commit changes
git add .
git commit -m "feat: add blog module with CRUD operations"

# Push to remote
git push origin feature/blog-module

# Create Pull Request on GitHub/GitLab
```

### Commit Message Convention

Follow **Conventional Commits** specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Commit Types

| Type       | Description             | Example                                     |
| ---------- | ----------------------- | ------------------------------------------- |
| `feat`     | New feature             | `feat(users): add user profile page`        |
| `fix`      | Bug fix                 | `fix(auth): resolve login validation issue` |
| `docs`     | Documentation           | `docs(readme): update installation steps`   |
| `style`    | Code style (formatting) | `style(users): format user component`       |
| `refactor` | Code refactoring        | `refactor(repo): simplify user repository`  |
| `test`     | Tests                   | `test(users): add user creation tests`      |
| `chore`    | Maintenance             | `chore(deps): update dependencies`          |

#### Examples

```bash
# Feature
git commit -m "feat(posts): implement blog post creation"

# Bug fix
git commit -m "fix(auth): correct token validation logic"

# Documentation
git commit -m "docs(api): document user endpoints"

# Multiple changes
git commit -m "feat(posts): add post management

- Implement post CRUD operations
- Add post transformer
- Create post repository
- Add post validation requests"
```

### Pull Request Process

1. **Create Pull Request**
   - From: `feature/your-feature`
   - To: `dev`
   - Title: Clear description of changes
   - Description: What, why, and how

2. **PR Description Template**

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update

## Changes Made

- List of changes
- Another change
- More changes

## Testing

- [ ] Backend tests pass
- [ ] Frontend tests pass
- [ ] Manual testing completed

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors/warnings
```

3. **Code Review**
   - Address reviewer feedback
   - Make requested changes
   - Push additional commits

4. **Merge**
   - Squash and merge (recommended)
   - Delete branch after merge

## Code Quality

### Linting and Formatting

#### Backend (PHP)

**Laravel Pint** for code formatting:

```bash
# Format all files
./vendor/bin/pint

# Check specific file
./vendor/bin/pint app/Http/Controllers/UserController.php
```

#### Frontend (TypeScript/React)

**ESLint** for linting:

```bash
# Lint all files
npm run lint

# Fix automatically fixable issues
npm run lint -- --fix
```

**Prettier** for formatting:

```bash
# Format all files
npm run format:write

# Check formatting
npm run format:check
```

### Pre-commit Hooks

Husky runs checks before each commit:

```bash
# Configured in package.json
"lint-staged": {
  "resources/js/**/*.{ts,tsx}": [
    "prettier --write",
    "eslint --fix"
  ],
  "resources/js/**/*.css": "prettier --write"
}
```

### Code Standards

#### PHP Standards (PSR-12)

```php
// ✅ Good
class UserController extends Controller
{
    private $repository;

    public function __construct(
        UserTransformer $transformer,
        UserRepository $repository,
        Request $request
    ) {
        parent::__construct($transformer, $request);
        $this->repository = $repository;
    }

    public function index(Request $request)
    {
        $users = $this->repository->paginate($request->all());
        return $this->respondWithCollection($users);
    }
}
```

#### TypeScript Standards

```typescript
// ✅ Good
interface UserProps {
  user: User
  onEdit: (id: number) => void
}

export const UserCard: React.FC<UserProps> = ({ user, onEdit }) => {
  return (
    <div className="rounded-lg border bg-white p-4">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <button onClick={() => onEdit(user.id)}>Edit</button>
    </div>
  )
}
```

## Feature Development

### Step-by-Step Process

1. **Plan Feature**
   - Define requirements
   - Design data structure
   - Plan API endpoints
   - Identify permissions

2. **Create Branch**

```bash
git checkout -b feature/my-feature
```

3. **Backend Development**
   - Create migration
   - Create model
   - Create repository
   - Create controller
   - Create requests
   - Create transformer
   - Add routes

4. **Frontend Development**
   - Create context structure
   - Define types
   - Create actions
   - Create hooks
   - Create components
   - Create pages
   - Add routes

5. **Testing**
   - Test backend endpoints
   - Test frontend UI
   - Test integration
   - Manual testing

6. **Code Review**
   - Self-review code
   - Run linters
   - Check for errors
   - Update documentation

7. **Create Pull Request**
   - Clear title and description
   - Link related issues
   - Add screenshots/videos

8. **Address Feedback**
   - Respond to comments
   - Make requested changes
   - Update PR

9. **Merge**
   - Once approved
   - Delete feature branch

### Example Workflow

```bash
# 1. Create branch
git checkout -b feature/blog-posts

# 2. Backend - Create migration
php artisan make:migration create_posts_table
php artisan migrate

# 3. Backend - Create model and repository
php artisan make:model Post
# Create repository files...

# 4. Backend - Create controller and requests
php artisan make:controller PostController
php artisan make:request Api/Post/CreateRequest

# 5. Backend - Add routes
# Edit routes/api.php

# 6. Frontend - Create context structure
mkdir -p resources/js/contexts/post/{actions,components,hooks,pages,libs,router}

# 7. Frontend - Implement feature
# Create actions, hooks, components, pages...

# 8. Test
npm run start
# Test in browser

# 9. Lint and format
npm run lint
npm run format:write
./vendor/bin/pint

# 10. Commit
git add .
git commit -m "feat(posts): implement blog post management"

# 11. Push and create PR
git push origin feature/blog-posts
```

## Bug Fixes

### Bug Fix Workflow

1. **Identify Bug**
   - Reproduce the issue
   - Document steps to reproduce
   - Identify affected code

2. **Create Branch**

```bash
git checkout -b bugfix/login-validation
```

3. **Fix Bug**
   - Make minimal changes
   - Don't introduce new features
   - Add comments if needed

4. **Test Fix**
   - Verify bug is fixed
   - Test related functionality
   - Ensure no regression

5. **Commit**

```bash
git commit -m "fix(auth): correct email validation in login form"
```

6. **Create PR**
   - Describe the bug
   - Explain the fix
   - Show before/after

### Critical Bug (Hotfix)

For production issues:

```bash
# Branch from main/master
git checkout main
git checkout -b hotfix/critical-security-issue

# Fix the issue
# ...

# Commit
git commit -m "fix(security): patch XSS vulnerability"

# Merge to main AND dev
git checkout main
git merge hotfix/critical-security-issue
git push origin main

git checkout dev
git merge hotfix/critical-security-issue
git push origin dev

# Tag release
git tag -a v1.0.1 -m "Hotfix: Security patch"
git push origin v1.0.1
```

## Code Review

### As a Reviewer

**Review Checklist:**

- [ ] Code follows project standards
- [ ] Logic is clear and correct
- [ ] No obvious bugs or errors
- [ ] Tests are included (if applicable)
- [ ] Documentation updated (if needed)
- [ ] No security vulnerabilities
- [ ] Performance considerations addressed
- [ ] Error handling is appropriate

**Review Comments:**

```markdown
# Suggestions

Consider using a more descriptive variable name here.

# Required Changes

This will cause a bug when the user is null. Please add a null check.

# Questions

Why did you choose this approach? Have you considered [alternative]?

# Praise

Great job implementing this feature! The code is very clean and well-documented.
```

### As a Contributor

**Responding to Reviews:**

- Be open to feedback
- Ask questions if unclear
- Explain your reasoning
- Make requested changes promptly
- Thank reviewers

## Database Changes

### Creating Migrations

```bash
# Create migration
php artisan make:migration create_posts_table

# Create migration for existing table
php artisan make:migration add_status_to_users_table
```

### Migration Best Practices

```php
// ✅ Good - Reversible
public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->string('phone')->nullable()->after('email');
    });
}

public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn('phone');
    });
}

// ❌ Bad - Not reversible
public function up(): void
{
    DB::statement('ALTER TABLE users ADD phone VARCHAR(255)');
}

public function down(): void
{
    // No rollback possible
}
```

### Running Migrations

```bash
# Run new migrations
php artisan migrate

# Rollback last batch
php artisan migrate:rollback

# Rollback all migrations
php artisan migrate:reset

# Drop all tables and re-run migrations
php artisan migrate:fresh

# Fresh migration with seeding
php artisan migrate:fresh --seed
```

## Deployment Process

See [Deployment Guide](./DEPLOYMENT.md) for detailed deployment instructions.

### Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Migrations tested
- [ ] Environment variables configured
- [ ] Assets compiled
- [ ] Documentation updated
- [ ] Changelog updated

### Deployment Steps

```bash
# 1. Pull latest code
git pull origin main

# 2. Install dependencies
composer install --no-dev --optimize-autoloader
npm install --production

# 3. Build frontend
npm run build

# 4. Run migrations
php artisan migrate --force

# 5. Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 6. Restart queue workers
php artisan queue:restart

# 7. Clear application cache (if needed)
php artisan cache:clear
```

## Best Practices

### 1. Commit Often

```bash
# ✅ Good - Small, focused commits
git commit -m "feat(posts): add post model and migration"
git commit -m "feat(posts): implement post repository"
git commit -m "feat(posts): create post controller"

# ❌ Bad - Large, unfocused commit
git commit -m "add entire blog feature"
```

### 2. Keep Branches Updated

```bash
# Regularly sync with dev
git checkout dev
git pull origin dev
git checkout feature/my-feature
git merge dev
```

### 3. Write Meaningful Commit Messages

```bash
# ✅ Good
git commit -m "fix(auth): resolve token expiration issue

- Update token lifetime to 24 hours
- Add token refresh logic
- Fix token validation in middleware"

# ❌ Bad
git commit -m "fix bug"
```

### 4. Review Your Own Code First

Before creating a PR:

- Read through all changes
- Remove debug code
- Check for commented code
- Verify no sensitive data

### 5. Document Complex Logic

```php
// ✅ Good
/**
 * Calculate the user's reputation score based on activity.
 *
 * The score is calculated as:
 * - 10 points per post
 * - 5 points per comment
 * - Bonus for verified email
 */
public function calculateReputationScore(): int
{
    // Implementation...
}

// ❌ Bad
public function calc(): int
{
    // Complex logic with no explanation
}
```

## Troubleshooting

### Common Issues

**Issue: Migration fails**

```bash
# Solution: Rollback and retry
php artisan migrate:rollback
php artisan migrate
```

**Issue: Assets not updating**

```bash
# Solution: Clear cache and rebuild
npm run build
php artisan cache:clear
```

**Issue: Permission denied**

```bash
# Solution: Fix permissions
sudo chown -R $USER:$USER storage bootstrap/cache
chmod -R 775 storage bootstrap/cache
```

**Issue: Composer/NPM dependencies conflict**

```bash
# Solution: Fresh install
rm -rf vendor node_modules
composer install
npm install
```

---

**Next**: Learn about testing strategies in the [Testing Guide](./TESTING.md).
