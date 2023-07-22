# Tims Book Blog Backend

## Description
This is a [Nest.js](https://nestjs.com/) based backend to create my personal book blog. Its build upon jordichers [starter template](https://github.com/jordicher/nestjs-typeorm-auth-template). Currently it's still under construction. 

## Installation
- docker compose up
- npm run dev
- npm install

## Configuration
Adjust the following parameters in your env file.

   - `ACCESS_TOKEN_EXPIRATION`: expiration time of the JWT access token
   - `REFRESH_TOKEN_EXPIRATION`: expiration time of the JWT refresh token
   - `JWT_SECRET`: secret key used by JWT to encode access token
   - `JWT_REFRESH_SECRET`: secret key used by JWT to encode refresh token
   - `DATABASE_PORT`: port used by the API
     
### Database config
   - POSTGRES_NAME=template
   - POSTGRES_PORT=5432
   - POSTGRES_PASSWORD=templateUserPass
   - POSTGRES_USER=templateUser
   - POSTGRES_HOST=localhost

## Running the app

### Start the database with docker

```
$ npm run infra:up
```
### Start the app in watch mode

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
