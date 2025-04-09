# Use Node.js to build the Angular app
FROM node:20 AS build-stage

WORKDIR /app

# Copy package files and install dependencies (leveraging Docker cache)
COPY package*.json ./
RUN npm ci

# Copy source code and build the app
COPY . .
RUN npm run build --configuration=production

# Use Nginx to serve the built Angular app
FROM nginx:alpine

# Create nginx configuration for Angular SPA routing
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
    try_files $uri $uri/ /index.html; \
    } \
    }' > /etc/nginx/conf.d/default.conf

# Copy build from previous stage
COPY --from=build-stage /app/dist/worklog-client/browser /usr/share/nginx/html

# Use non-root user for security
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

# Expose Nginx default port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]