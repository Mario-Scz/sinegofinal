FROM php:8.2-apache

# Instalar extensión PDO MySQL
RUN docker-php-ext-install pdo pdo_mysql

# Copiar archivos del proyecto
COPY . /var/www/html

# Permitir .htaccess
RUN a2enmod rewrite