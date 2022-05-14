FROM node:16-alpine3.11

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . /home/node/app

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
