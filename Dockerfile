FROM node:8-alpine

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++

RUN npm install pm2 -g

ARG NODE_ENV=production

ENV NODE_ENV $NODE_ENV

WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install

COPY conduit/ /app/conduit
COPY handlers/ /app/handlers
COPY bottender.config.js /app/bottender.config.js
COPY index.js /app/index.js

COPY .env /app/.env

CMD [ "pm2-runtime", "start", "index.js" ]
