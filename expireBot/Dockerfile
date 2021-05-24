FROM node:16.0.0-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "dist/main.js" ]