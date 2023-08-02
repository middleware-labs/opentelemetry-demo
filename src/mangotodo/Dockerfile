FROM node:16-alpine

# Create app directory
WORKDIR /var/www/todoapp

# Bundle app source
COPY ./src/mangotodo .

RUN apk add --no-cache python3 make g++

# Install app dependencies
RUN npm install

RUN npm ci --omit=dev

EXPOSE 8080
CMD [ "node", "server.js" ]
