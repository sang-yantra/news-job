# Dockerfile for node js job

# node 16 alpine base image
FROM node:16-alpine

# create directory for the app. dir = /home/app/news
RUN mkdir -p /home/app/news/node_modules

# set working directory
WORKDIR /home/app/news

# copy package.json and package-lock.json 
# Adding this COPY instruction before running npm install or copying the application code allows you to take advantage 
# of Docker’s caching mechanism. At each stage in the build, Docker will check to see if it has a layer cached for that
# particular instruction. If you change the package.json, this layer will be rebuilt, but if you don’t, this 
# instruction will allow Docker to use the existing image layer and skip reinstalling your node modules.
COPY package*.json ./

# To ensure that all of the application files are owned by the non-root node user, including the contents of the 
# node_modules directory, switch the user to node before running npm install:

COPY . .
RUN npm install

RUN npm run build

EXPOSE 8080

CMD [ "node", "./dist/index.js" ]
#RUN npm run start
