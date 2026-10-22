# ==============================================================================
# AlgoPulse Studio V2 — Docker Deployment (Low-Resource < 1.8GB RAM Container)
# ==============================================================================

# Build Stage
FROM node:22-alpine AS builder
WORKDIR /app

# Copy root dependencies and packages
COPY package*.json ./
RUN npm ci --only=production

# Copy studio-ui and build production assets
COPY apps/studio-ui/package*.json ./apps/studio-ui/
RUN cd apps/studio-ui && npm ci
COPY . .
RUN cd apps/studio-ui && npm run build

# Production Stage
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3333
EXPOSE 3333

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/apps/studio-ui/dist ./apps/studio-ui/dist
COPY --from=builder /app/apps ./apps
COPY --from=builder /app/src ./src
COPY --from=builder /app/practice ./practice
COPY --from=builder /app/knowledge ./knowledge
COPY --from=builder /app/contests ./contests
COPY --from=builder /app/solutions ./solutions

CMD ["node", "apps/visualizer/server.js"]
