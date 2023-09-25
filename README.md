# Tims Book Blog Backend

## Description
This is a [Nest.js](https://nestjs.com/) based backend to create my personal book blog. Its build upon jordichers [starter template](https://github.com/jordicher/nestjs-typeorm-auth-template). Currently it's still under construction.

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
   - POSTGRES_HOST= (Add name of your db host. If left empty 'localhost will be assumed' )


## Installation

### Development
- docker compose up POSTGRES_NAME
- npm install
- npm run start:dev

### Production
For starting the first time:
- docker compose up --build

Afterwards: 
- docker compose up

You can find the swagger doc here: `http://localhost:8080/docs/`


## Running the app

### Development

```bash
npm run start:dev
```

### Production

```bash
docker-compose up --build
```
