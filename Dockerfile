FROM node:16-alpine3.11

WORKDIR /home/node/app

COPY package*.json ./

COPY Makefile ./

RUN apk update && apk add make

RUN make install

COPY . /home/node/app

RUN make build

CMD [ "env","npm", "run", "start" ]
