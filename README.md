# Backend Book Blog

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

### Installation
- docker compose up
- npm run dev
- npm install

## Configuration
2. As it is, it should work, but you can change these parameters:

   - `ACCESS_TOKEN_EXPIRATION`: expiration time of the JWT access token
   - `REFRESH_TOKEN_EXPIRATION`: expiration time of the JWT refresh token
   - `JWT_SECRET`: secret key used by JWT to encode access token
   - `JWT_REFRESH_SECRET`: secret key used by JWT to encode refresh token
   - `DATABASE_PORT`: port used by the API

## Database configuration

1. In the root of the API project, edit the file `.env` and configure these parameters using your Postgres configuration.

   ```
   POSTGRES_NAME=template
   POSTGRES_PORT=5432
   POSTGRES_PASSWORD=templateUserPass
   POSTGRES_USER=templateUser
   POSTGRES_HOST=localhost
   ```

2. Start the database with docker

```
$ npm run infra:up
```

## Running the app

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# e2e tests
$ npm run test:e2e

```

### Migrations.

To create a migration and implement changes in the db.

//**run old migrations, this project by default has a user migration**

```
$ npm run migration:run
```

//generate a migration

```
$ npm run migration:generate name_new_migration
```

//run the migration

```
$ npm run migration:run
```

## How refresh tokens work

The access token has to have a short lifetime, while the refresh token has to have a longer lifetime. (you can modify the duration by modifying the project variables).

When logging in, it returns the two tokens.
The refresh token is encrypted in the database, and is reset every time the user logs in or out.

When an access token expires, the endpoint will return a custom error.
httpStatus = 498
message = Token expired

In this case, a request must be made to auth/refresh-token that contains the refresh token in the header. This will return a valid access token.
