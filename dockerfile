FROM node:lts-alpine as production

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY ./src ./src
COPY ./static ./static
COPY ./nest-cli.json ./
COPY ./tsconfig.build.json ./
COPY ./tsconfig.json ./
COPY .env .env
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["npm", "run", "start:prod"]
