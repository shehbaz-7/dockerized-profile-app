FROM node

RUN mkdir -p /home/node-app

COPY ./app /home/node-app

CMD ["node", "/home/node-app/server.js"]