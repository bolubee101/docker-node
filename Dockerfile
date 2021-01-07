# Base Image
FROM node:15.5.0

# Changes dirctory in the container to this
WORKDIR /docker-app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD ["node", "app.js"]

# Port that the node app will listen on
EXPOSE 3333