# Use official Nginx image
FROM nginx:alpine

# Copy your website files into Nginx default public folder
COPY . /usr/share/nginx/html

# Expose port 80 to access the website
EXPOSE 80
