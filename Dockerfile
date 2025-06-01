# --- Build Stage ---
FROM node:24.1.0-alpine3.21 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run generate

# --- Production Stage ---
FROM nginx:1.27.5-alpine3.21-slim AS production

# Remove default nginx index page
RUN rm -f /usr/share/nginx/html/index.html

COPY --from=builder /app/.output/public /usr/share/nginx/html
COPY --from=builder /app/public/robots.txt /usr/share/nginx/html/robots.txt
COPY --from=builder /app/public/favicon.ico /usr/share/nginx/html/favicon.ico


# Copy custom nginx config (optional, for SPA fallback)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 