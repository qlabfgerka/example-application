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
NestJS requires a `.env` file with the following properties:
```
POSTGRESQL_HOST = '...'
POSTGRESQL_PORT = ...
POSTGRESQL_USERNAME = '...'
POSTGRESQL_PASSWORD = '...'
POSTGRESQL_DATABASE = '...'
```

#### Spring Boot
Run the SpringBootBackendApplication inside IntelliJ IDEA.

**NOTE!**
Spring Boot requires an `application.properties` file with the following properties:
```
server.port=3000
spring.datasource.url=...
spring.datasource.username=...
spring.datasource.password=...
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQL9Dialect
spring.jpa.properties.hibernate.format_sql=true
```

#### Quarkus
Run Quarkus with:
`./mvnw compile quarkus:dev`

**NOTE!**
Quarkus requires an `application.properties` file with the following properties:
```
quarkus.http.port=3000

quarkus.datasource.jdbc.url=...
quarkus.datasource.username=...
quarkus.datasource.password=...
quarkus.datasource.db-kind=postgresql
```

And optionally this for CORS:
```
quarkus.http.cors=true
quarkus.http.cors.origins=*
quarkus.http.cors.methods=GET, POST, PUT, DELETE
quarkus.http.cors.exposed-headers=Content-Disposition
```
