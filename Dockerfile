FROM nginx:1.17.1-alpine
COPY /docs/ /usr/share/nginx/html
