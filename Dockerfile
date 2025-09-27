# --- Build Stage ---
FROM node:24.9.0-alpine3.22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run generate

# --- Production Stage ---
FROM nginx:1.29.1-alpine3.22-slim AS production

# Remove default nginx index page
RUN rm -f /usr/share/nginx/html/index.html

COPY --from=builder /app/.output/public /usr/share/nginx/html

# Copy custom nginx config (optional, for SPA fallback)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 