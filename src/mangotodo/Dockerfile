FROM node:16-alpine

# Create app directory
WORKDIR /var/www/todoapp

# Bundle app source
COPY ./src/mangotodo .

# Install app dependencies
RUN npm install

EXPOSE 8080
CMD [ "node", "server.js" ]