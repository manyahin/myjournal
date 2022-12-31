FROM node:8.15-alpine

RUN mkdir -p /app/client
WORKDIR /app

COPY package*.json /app/
COPY client/package*.json /app/client/

# install deps for server and client sides
RUN npm ci && cd /app/client && npm ci

ENV NODE_ENV production

COPY . /app

# build client side
RUN cd /app/client && npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
