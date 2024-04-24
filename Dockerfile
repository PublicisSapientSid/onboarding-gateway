# Use the official Node.js 16 image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install project dependencies
RUN npm ci

# Copy everything to the container
COPY . .

# Build your Nest.js application
RUN npm run build

# Remove the source folder
RUN rm -rf ./src

# Expose the port your Nest.js application is listening on
EXPOSE 3000

# Command to start your Nest.js application
CMD [ "npm", "run", "start:prod" ]