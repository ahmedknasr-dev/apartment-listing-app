# Development Dockerfile for Frontend
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm@8

WORKDIR /app

# Copy workspace and package files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy shared package source and build it BEFORE copying frontend
COPY packages/shared ./packages/shared
RUN pnpm --filter @apartment-listing/shared run build

# Copy frontend source code
COPY apps/frontend ./apps/frontend

WORKDIR /app/apps/frontend

# Expose port
EXPOSE 3000

# Start development server
CMD ["pnpm", "dev"]
