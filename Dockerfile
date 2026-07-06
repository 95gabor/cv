# Multi-stage production image: Next.js static export inside Docker, served by nginx.
# Build args: SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, NEXT_PUBLIC_SITE_URL.
# CI validation uses local Supabase (host.docker.internal:54321); publish uses cloud URL.
FROM node:24.18.0-alpine3.24 AS builder

RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG SUPABASE_URL
ARG SUPABASE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_SITE_URL=https://95gabor.me

ENV SUPABASE_URL=$SUPABASE_URL \
    SUPABASE_PUBLISHABLE_KEY=$SUPABASE_PUBLISHABLE_KEY \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

RUN pnpm run generate

# --- Production Stage ---
FROM nginx:1.31.2-alpine3.23-slim AS production

RUN rm -f /usr/share/nginx/html/index.html

COPY --from=builder /app/out /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
