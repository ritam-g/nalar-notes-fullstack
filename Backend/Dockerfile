FROM node:18

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy all backend code
COPY . .

# Expose your backend port
EXPOSE 3000

# Start server
CMD ["node", "server.js"]