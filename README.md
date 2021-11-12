# Example Application

## Application info
When a user visits the frontend application a user entry in the database is created and returned to the frontend and stored in the local storage. The user can then view, create, edit and delete tasks.

## Running the application

### Frontends

#### Angular
Enter the `frontends/angular-frontend` directory and run `ng serve`

### Backends

#### NestJS
Enter the `backends/nestjs-backend` directory and run `npm run start:dev`

**NOTE!**
NestJS requires a .env file with the following properties:
```
POSTGRESQL_HOST = '...'
POSTGRESQL_PORT = ...
POSTGRESQL_USERNAME = '...'
POSTGRESQL_PASSWORD = '...'
POSTGRESQL_DATABASE = '...'
```
