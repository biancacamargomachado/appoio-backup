FROM node:13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
RUN export ENV=dev
EXPOSE 3000
CMD [ "node", "index.js", "dev" ]
