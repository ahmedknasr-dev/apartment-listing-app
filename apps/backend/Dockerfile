# Development Dockerfile for Backend
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm@8

WORKDIR /app

# Copy workspace and package files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/backend/package.json ./apps/backend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy backend source code
COPY apps/backend ./apps/backend
COPY tsconfig.json ./

WORKDIR /app/apps/backend

# Expose port
EXPOSE 3001

# Start development server
CMD ["pnpm", "start:dev"]
