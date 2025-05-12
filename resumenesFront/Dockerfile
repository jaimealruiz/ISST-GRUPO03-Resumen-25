# Etapa 1: build con Node
FROM node:20.11.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: nginx + tu default.conf
FROM nginx:alpine
# 1) Primero copia tu default.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# 2) Luego copia los ficheros estáticos generados
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
