# Use the official Node.js image as a base
FROM node:22-slim

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to install dependencies
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy tsconfig.json explicitly
COPY tsconfig.json .

# Copy the rest of your application files
COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Build the TypeScript code
RUN npm run build

# Expose the frontend port
EXPOSE 3000

# Start the frontend service
CMD ["npm", "run", "production"]
