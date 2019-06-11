# Define runtime and linux version
FROM node:11-alpine

# Set working directory
WORKDIR /var/app/hacker-news-scraper

# Copy source files
COPY package.json .
COPY index.js ./

# Install dependencies
RUN npm install

# Start bash terminal
ENTRYPOINT ["/bin/sh"]