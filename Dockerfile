FROM node:8-alpine

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++

RUN npm install pm2 -g

ARG NODE_ENV=production

ENV NODE_ENV $NODE_ENV

WORKDIR /app
COPY package.json /app/
RUN npm install

COPY conduit/ /app/conduit
COPY handlers/ /app/handlers
COPY bottender.config.js /app/bottender.config.js
COPY index.js /app/index.js

CMD [ "pm2-runtime", "start", "index.js" ]
