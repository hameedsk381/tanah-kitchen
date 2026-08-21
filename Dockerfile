# ── STAGE 1: Build Frontend Assets ──
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm install

# Copy source files and build React SPA
COPY . .
RUN npm run build

# ── STAGE 2: Production Server ──
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Install production dependencies only
COPY package*.json ./
RUN npm install --omit=dev

# Copy built frontend assets from builder stage
COPY --from=builder /app/dist ./dist

# Copy backend server, public assets, and default datasets
COPY server ./server
COPY public ./public
COPY src/data ./src/data

# Ensure data and upload directories exist
RUN mkdir -p /app/server/data /app/uploads

# Expose server port
EXPOSE 5000

# Start Express Node.js server
CMD ["node", "server/index.js"]
