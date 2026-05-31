# Part II Lab: Building a custom image with layer caching
FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY app.js ./
EXPOSE 3001
ENV APP_NAME="Container Lab"
CMD ["node", "app.js"]
