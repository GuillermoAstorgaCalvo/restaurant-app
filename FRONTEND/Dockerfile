# Usa la última versión LTS de Node.js
FROM node:22-slim

# Configura el directorio de trabajo
WORKDIR /usr/src/app

# Instala las dependencias de frontend
COPY package*.json ./
RUN npm install

# Copia el código del frontend
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Comando de inicio
CMD ["npm", "run", "dev"]
