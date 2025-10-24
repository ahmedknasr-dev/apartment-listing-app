# Development Dockerfile for Frontend
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm@8

WORKDIR /app

# Copy workspace and package files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/frontend/package.json ./apps/frontend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy frontend source code
COPY apps/frontend ./apps/frontend

WORKDIR /app/apps/frontend

# Expose port
EXPOSE 3000

# Start development server
CMD ["pnpm", "dev"]
