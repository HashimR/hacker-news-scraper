# Define runtime and linux version
FROM node:8

# Set working directory
WORKDIR /var/app/hacker-news-scraper

# Copy source files
COPY package.json .
COPY scraper.js ./

# Install dependencies
RUN npm install

# Start bash terminal
ENTRYPOINT ["/bin/sh"]