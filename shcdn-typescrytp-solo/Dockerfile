# Usa una imagen base de Node.js basada en Debian
FROM node:20-bullseye

# Configura el entorno de trabajo
WORKDIR /app

# Copia los archivos de tu aplicación
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install --legacy-peer-deps

# Copia el resto del código
COPY . .

# Genera el cliente de Prisma
RUN npx prisma generate

# Compila la aplicación
RUN npm run build

# Exponer el puerto de la app
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]


# # Etapa base: Utilizamos Node.js con Alpine como base
# FROM node:20.18-alpine AS base

# # Etapa deps: Instalamos dependencias necesarias para Prisma
# FROM base AS deps

# # Instalar dependencias del sistema necesarias para Prisma
# RUN apk add --no-cache \
#     openssl=1.1.1n-r7 \
#     zlib \
#     libgcc \
#     libstdc++ \
#     musl \
#     bash \
#     && ln -sf /usr/lib/libssl.so.1.1 /usr/lib/libssl.so \
#     && ln -sf /usr/lib/libcrypto.so.1.1 /usr/lib/libcrypto.so

# # Directorio de trabajo para las dependencias
# WORKDIR /app

# # Copiar los archivos de configuración de Node.js
# COPY package.json package-lock.json ./

# # Instalar dependencias de Node.js
# RUN npm ci --legacy-peer-deps

# # Etapa builder: Construcción de la aplicación
# FROM base AS builder

# WORKDIR /app

# # Copiar dependencias instaladas desde la etapa deps
# COPY --from=deps /app/node_modules ./node_modules

# # Copiar el código fuente de la aplicación
# COPY . .

# # Construir la aplicación
# RUN npm run build

# # Etapa runner: Contenedor final para producción
# FROM base AS runner

# WORKDIR /app

# # Establecer el entorno de producción
# ENV NODE_ENV=production

# # Crear usuario y grupo no root para mayor seguridad
# RUN addgroup --system --gid 1001 nodejs \
#     && adduser --system --uid 1001 nextjs

# # Copiar archivos públicos y la salida de construcción
# COPY --from=builder /app/public ./public
# RUN mkdir .next
# RUN chown nextjs:nodejs .next

# # Copiar la aplicación compilada
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# # Cambiar al usuario no root
# USER nextjs

# # Exponer el puerto de la aplicación
# EXPOSE 3001
# ENV PORT 3001

# # Comando para iniciar la aplicación
# CMD ["node", "server.js"]
# FROM node:20.18-alpine AS base
# FROM  base AS deps
# RUN apk add --no-cache libc6-compat openssl1.1-compat
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm ci --legacy-peer-deps

# FROM base AS builder 
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# RUN npm run build

# FROM base AS runner

# WORKDIR /app

# ENV NODE_ENV=production

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public

# RUN mkdir .next
# RUN chown nextjs:nodejs .next

# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# USER nextjs

# EXPOSE 3001

# ENV PORT 3001
# CMD HOSTNAME="0.0.0.0" node server.js