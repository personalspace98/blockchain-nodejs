FROM node:14-alpine
WORKDIR /app

# Copy package files from root path
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy source code from root path
COPY . ./

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "./app"]
