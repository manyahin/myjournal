FROM node:8.11-alpine

RUN mkdir /app
WORKDIR /app

COPY package*.json /app/
RUN npm install

ENV NODE_ENV production

COPY . /app

RUN cd /app/client && npm install && npm run build

EXPOSE 3000

CMD [ "npm", "start" ]