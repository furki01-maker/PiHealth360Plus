# Node.js 18
FROM node:18-bullseye

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --production

COPY . .

EXPOSE 8080
ENV NODE_ENV=production

CMD ["node", "src/index.js"]