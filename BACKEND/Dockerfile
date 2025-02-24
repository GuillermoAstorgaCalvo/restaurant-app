# Usa la última versión LTS de Node.js
FROM node:22-slim

# Configura el directorio de trabajo
WORKDIR /usr/src/app

# Instala las dependencias de backend
COPY package*.json ./
RUN npm install && npm install -g nodemon

# Copia el código del backend
COPY . .

# Expone el puerto 3001
EXPOSE 3001
EXPOSE 9229

# Comando de inicio
CMD ["npm", "run", "production"]
