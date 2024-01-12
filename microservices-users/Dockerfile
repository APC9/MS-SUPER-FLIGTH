FROM node:21-alpine3.18 
WORKDIR /app
COPY package.json .
RUN yarn 
COPY ./dist ./src
CMD [ "node", "src/main.js" ]