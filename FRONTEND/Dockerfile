# Use the official Node.js image as a base
FROM node:16-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to install dependencies
COPY ./package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your application files
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the frontend port
EXPOSE 3000

# Start the frontend service
CMD ["npm", "run", "production"]
