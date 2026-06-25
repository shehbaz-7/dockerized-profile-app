FROM node:20-alpine

RUN mkdir -p /home/node-app

WORKDIR /home/node-app


COPY package*.json ./


RUN npm install


COPY . .


CMD ["node", "server.js"]