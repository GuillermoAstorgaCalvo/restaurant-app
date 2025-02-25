# Use the latest LTS Node.js version
FROM node:22-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend code to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose ports
EXPOSE 3001

# Start the app in production mode
CMD ["npm", "run", "production"]
