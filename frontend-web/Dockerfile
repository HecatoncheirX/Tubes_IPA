# --- Tahap 1: Build React ---
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Perintah ini akan membuat folder 'build' berisi HTML/CSS/JS jadi
RUN npm run build

# --- Tahap 2: Setup Nginx ---
FROM nginx:alpine
# Copy hasil build dari Tahap 1 ke folder Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Konfigurasi agar Nginx support React Router (jika ada refresh page)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]