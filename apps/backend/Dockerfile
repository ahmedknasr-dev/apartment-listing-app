# Development Dockerfile for Backend
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm@8

WORKDIR /app

# Copy workspace and package files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Install again to ensure all workspace symlinks are created
RUN pnpm install

# Copy shared package and build it
COPY packages/shared ./packages/shared
RUN cd packages/shared && pnpm run build

# Copy backend source code
COPY apps/backend ./apps/backend
COPY tsconfig.json ./

WORKDIR /app/apps/backend

# Expose port
EXPOSE 3001

# Start development server
CMD ["sh", "-c", "pnpm nest build && pnpm start:dev"]
