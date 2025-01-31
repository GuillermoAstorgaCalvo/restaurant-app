# Use a Node.js base image
FROM node:22-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the default Next.js port
EXPOSE 3000
EXPOSE 9241

# Command to start the app
CMD ["npm", "run", "dev"]
