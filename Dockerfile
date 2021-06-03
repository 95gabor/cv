FROM nginx:stable-alpine

LABEL maintainer="Gabor Pichner <95gabor@gmail.com>"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY src /usr/share/nginx/html

EXPOSE 80