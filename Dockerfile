FROM nginx:1.27.5-alpine3.21-slim

LABEL maintainer="Gabor Pichner <95gabor@gmail.com>"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY src /usr/share/nginx/html

EXPOSE 80
