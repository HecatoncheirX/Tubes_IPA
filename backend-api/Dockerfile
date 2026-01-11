# Gunakan Image PHP 8.2
FROM php:8.4-fpm

# Install library yang dibutuhkan (termasuk driver PostgreSQL)
RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_pgsql

# Set folder kerja di dalam container
WORKDIR /var/www/html

# Copy semua file Laravel ke dalam container
COPY . .

# Install Composer (Manajer Paket PHP)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer config --global process-timeout 2000 && \
    composer install --no-interaction --optimize-autoloader --no-dev --ignore-platform-reqs

# Beri hak akses agar Laravel bisa menulis log/cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Buka port 8000 (Port bawaan artisan serve)
EXPOSE 8000

# Perintah yang jalan saat container dinyalakan
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000