# Usa la última versión LTS de Node.js
FROM node:20-slim

# Configura el directorio de trabajo
WORKDIR /usr/src/app

# Instala las dependencias de backend
COPY package*.json ./
RUN npm install

# Copia el código del backend
COPY . .

# Expone el puerto 3001
EXPOSE 3001

# Comando de inicio
CMD ["npm", "run", "dev"]
