# Unit II Lab: Custom image with layering demonstration
FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY app.js ./
EXPOSE 3000
ENV APP_NAME="DevOps Lab"
CMD ["node", "app.js"]
