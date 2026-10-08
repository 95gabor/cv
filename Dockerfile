# syntax=docker/dockerfile:1
# Multi-stage production image: Next.js static export inside Docker, served by nginx.
# CV data is read from content/*.yaml at build time.
FROM node:24.21.0-alpine3.24 AS builder

RUN corepack enable && corepack prepare pnpm@12.4.1 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG NEXT_PUBLIC_SITE_URL=https://95gabor.me
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

RUN pnpm run generate

# --- Production Stage ---
FROM nginx:1.31.6-alpine3.24-slim AS production

RUN rm -f /usr/share/nginx/html/index.html

COPY --from=builder /app/out /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
