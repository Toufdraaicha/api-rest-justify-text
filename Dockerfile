# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./
# Install any needed packages specified in package.json
RUN npm install

# If you have a separate tsconfig.json file, copy it
# COPY tsconfig.json ./

# Copy your source files
COPY . .

# Compile TypeScript to JavaScript
RUN npx tsc


# Expose the port the app runs on
EXPOSE 3000
CMD ["node", "dist/app.js"]
