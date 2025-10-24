# 🏠 Apartment Listing App

A modern, production-ready monorepo application built with **NestJS** backend and **Next.js** frontend, showcasing enterprise-level development practices.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development](#development)
- [Code Quality](#code-quality)
- [Scripts](#scripts)
- [Git Workflow](#git-workflow)
- [Environment Variables](#environment-variables)

## 🎯 Overview

This project demonstrates senior-level software engineering practices including:

- ✅ **Monorepo architecture** with pnpm workspaces
- ✅ **Type-safe development** with TypeScript
- ✅ **Code quality enforcement** with ESLint, Prettier, Husky, and lint-staged
- ✅ **Conventional commits** with commitlint
- ✅ **Modern frameworks** - NestJS & Next.js 16
- ✅ **Bootstrap UI** with React Bootstrap
- ✅ **Git hooks** for automated quality checks

## 🚀 Tech Stack

### Backend (`apps/backend`)

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **Express** - HTTP server
- **Jest** - Testing framework

### Frontend (`apps/frontend`)

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **Bootstrap 5** - UI framework
- **React Bootstrap** - Bootstrap components for React
- **TypeScript** - Type-safe development

### DevOps & Tooling

- **pnpm** - Fast, disk space efficient package manager
- **Husky** - Git hooks management
- **lint-staged** - Run linters on staged files
- **commitlint** - Enforce conventional commits
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Structure

```
apartment-listing-app/
├── apps/
│   ├── backend/           # NestJS backend application
│   │   ├── src/
│   │   │   ├── app.controller.ts
│   │   │   ├── app.module.ts
│   │   │   ├── app.service.ts
│   │   │   └── main.ts
│   │   ├── test/
│   │   ├── .env
│   │   └── package.json
│   │
│   └── frontend/          # Next.js frontend application
│       ├── src/
│       │   └── app/
│       │       ├── layout.tsx
│       │       ├── page.tsx
│       │       └── globals.css
│       ├── public/
│       ├── .env.local
│       └── package.json
│
├── .husky/                # Git hooks
│   ├── pre-commit        # Runs lint-staged
│   └── commit-msg        # Validates commit messages
│
├── .eslintrc.js          # ESLint configuration
├── .prettierrc           # Prettier configuration
├── commitlint.config.js  # Commitlint configuration
├── .lintstagedrc.js      # Lint-staged configuration
├── pnpm-workspace.yaml   # pnpm workspace configuration
└── package.json          # Root package.json
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (install with: `npm install -g pnpm`)
- **Git**

## 🏁 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd apartment-listing-app
```

### 2. Install dependencies

```bash
pnpm install
```

This will install all dependencies for the root workspace and all apps.

### 3. Set up environment variables

**Backend:**

```bash
cp apps/backend/.env.example apps/backend/.env
```

**Frontend:**

```bash
cp apps/frontend/.env.local.example apps/frontend/.env.local
```

### 4. Start development servers

**Option 1: Start all apps simultaneously**

```bash
pnpm dev
```

**Option 2: Start apps individually**

```bash
# Terminal 1 - Backend (runs on http://localhost:3001)
pnpm dev:backend

# Terminal 2 - Frontend (runs on http://localhost:3000)
pnpm dev:frontend
```

### 5. Access the applications

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 🛠️ Development

### Working with the Backend

```bash
# Navigate to backend
cd apps/backend

# Run in development mode
pnpm dev

# Run tests
pnpm test

# Run e2e tests
pnpm test:e2e

# Build for production
pnpm build

# Start production server
pnpm start:prod
```

### Working with the Frontend

```bash
# Navigate to frontend
cd apps/frontend

# Run in development mode
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## ✨ Code Quality

This project enforces code quality through multiple tools:

### ESLint

Lints JavaScript/TypeScript code for potential errors and style issues.

```bash
# Run ESLint on all files
pnpm lint

# Fix auto-fixable issues
pnpm lint:fix
```

### Prettier

Formats code consistently across the project.

```bash
# Check formatting
pnpm format:check

# Format all files
pnpm format
```

### Lint-staged

Automatically runs linters on staged files before commit.

- Configured in `.lintstagedrc.js`
- Runs ESLint and Prettier on staged TypeScript/JavaScript files
- Runs Prettier on JSON, Markdown, and YAML files

### Husky Git Hooks

**Pre-commit hook:**

- Runs `lint-staged` to lint and format staged files
- Prevents commits with linting errors

**Commit-msg hook:**

- Validates commit messages follow conventional commits format
- Enforces consistent commit history

### Commitlint

Enforces conventional commit messages:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Valid types:**

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `build` - Build system changes
- `ci` - CI/CD changes
- `chore` - Other changes
- `revert` - Revert previous commit

**Examples:**

```bash
git commit -m "feat: add apartment listing component"
git commit -m "fix: resolve CORS issue in backend"
git commit -m "docs: update README with setup instructions"
```

## 📜 Scripts

### Root Scripts

```bash
# Development
pnpm dev              # Start all apps in development mode
pnpm dev:backend      # Start only backend
pnpm dev:frontend     # Start only frontend

# Build
pnpm build            # Build all apps
pnpm build:backend    # Build only backend
pnpm build:frontend   # Build only frontend

# Start production
pnpm start:backend    # Start backend in production
pnpm start:frontend   # Start frontend in production

# Code Quality
pnpm lint             # Lint all apps
pnpm lint:fix         # Lint and fix all apps
pnpm format           # Format all files
pnpm format:check     # Check formatting

# Maintenance
pnpm clean            # Remove all node_modules, dist, and build folders
```

## 🔄 Git Workflow

### Making Changes

1. **Create a feature branch**

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes**
   - Write clean, maintainable code
   - Follow TypeScript best practices
   - Add tests for new features

3. **Stage your changes**

   ```bash
   git add .
   ```

4. **Commit with conventional commit message**

   ```bash
   git commit -m "feat: add user authentication"
   ```

   The pre-commit hook will:
   - Run lint-staged (ESLint + Prettier on staged files)
   - Prevent commit if there are linting errors

   The commit-msg hook will:
   - Validate your commit message format
   - Reject commits that don't follow conventions

5. **Push your changes**
   ```bash
   git push origin feat/your-feature-name
   ```

### If Hooks Fail

If the pre-commit hook fails:

```bash
# Fix linting errors manually
pnpm lint:fix

# Or format files
pnpm format

# Stage and commit again
git add .
git commit -m "feat: add user authentication"
```

If the commit-msg hook fails:

```bash
# Amend your commit message
git commit --amend -m "feat: add user authentication"
```

## 🌍 Environment Variables

### Backend (`.env`)

```env
PORT=3001
NODE_ENV=development
```

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🧪 Testing

### Backend Tests

```bash
cd apps/backend

# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:cov

# Watch mode
pnpm test:watch
```

## 🏗️ Building for Production

### Build All Apps

```bash
pnpm build
```

### Build Individually

```bash
# Backend
pnpm build:backend

# Frontend
pnpm build:frontend
```

## 📝 Additional Notes

### Why pnpm?

- **Fast**: Up to 2x faster than npm/yarn
- **Efficient**: Saves disk space with content-addressable storage
- **Strict**: Better dependency resolution
- **Monorepo-friendly**: Native workspace support

### Monorepo Benefits

1. **Shared configurations**: ESLint, Prettier, TypeScript configs
2. **Dependency management**: Hoisted dependencies, version consistency
3. **Code sharing**: Easy to share types and utilities
4. **Atomic commits**: Changes across apps in single commit
5. **Simplified tooling**: Single CI/CD pipeline

## 🤝 Contributing

1. Follow conventional commits
2. Write meaningful commit messages
3. Keep PRs focused and small
4. Add tests for new features
5. Update documentation as needed

## 📄 License

MIT

## 👨‍💻 Author

Created by a senior developer showcasing professional development practices.

---

**Happy Coding! 🚀**
