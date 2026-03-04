FROM node:24-alpine

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source (will be overridden by volume mount in dev)
COPY . .

# Expose port
EXPOSE 3000

# Run in dev mode with hot reload
CMD ["pnpm", "start:dev"]
