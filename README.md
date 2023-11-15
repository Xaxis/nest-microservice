# nest-microservice

## Description

A NestJS microservice boilerplate template for rapidly spinning up microservice projects.

## Install Docker

1. Go to [Docker](https://www.docker.com/products/docker-desktop) and download the appropriate version for your OS.
2. Follow the installation instructions.

## Running the App with Docker

- Use `yarn docker:build:dev` to build your Docker image for development.
- Use `yarn docker:build:prod` to build your Docker image for production.
- Use `yarn docker:compose:build` to build services defined in your docker-compose.yml.
- Use `yarn docker:compose:up` to start services defined in your docker-compose.yml.
- Use `yarn docker:compose:down` to stop and remove containers, networks, images, and volumes defined in your docker-compose.yml.
- Use `yarn docker:compose:up:detached` to start services defined in docker-compose.yml in detached mode (running in the background).

## Directory Structure

The following provides a detailed overview of the directory structure for the NestJS microservice application. It is designed to facilitate understanding of where specific parts of the codebase are located and their intended purpose.

```
|-- config/
|   |-- docker/
|   |   |-- docker-compose.dev.yml
|   |   |-- docker-compose.prod.yml
|   |   |-- ...
|   |-- env/
|   |   |-- .env.dev
|   |   |-- .env.prod
|   |   |-- ...
|-- dist/
|-- node_modules/
```

```
src/
|-- core/
|   |-- auth/
|   |   |-- auth.module.ts
|   |   |-- auth.service.ts
|   |   |-- auth-jwt.strategy.ts
|   |   |-- auth-jwt.guard.ts
|   |-- config/
|   |   |-- config.module.ts
|   |   |-- config.service.ts
|   |   |-- config.interface.ts
|   |   |-- constants.ts
|   |   |-- env.config.ts
|   |   |-- env.dev.ts
|   |   |-- env.prod.ts
|   |-- database/
|   |   |-- migrations/
|   |   |-- seeds/
|   |   |-- sources/
|   |   |   |-- api.datasource.ts
|   |   |   |-- nosql.datasource.ts
|   |   |   |-- sql.datasource.ts
|   |-- resilience/
|   |   |-- circuit-breaker/
|   |   |   |-- circuit-breaker.service.ts
|   |   |-- retry/
|   |   |   |-- retry.service.ts
|-- features/
|   |-- feature-a/
|   |   |-- dto/
|   |   |   |-- inputs/
|   |   |   |-- outputs/
|   |   |-- entities/
|   |   |-- interfaces/
|   |   |-- feature-a.module.ts
|   |   |-- feature-a.service.ts
|   |   |-- feature-a.controller.ts
|   |   |-- tests/
|   |-- feature-b/
|   |   |-- dto/
|   |   |   |-- inputs/
|   |   |   |-- outputs/
|   |   |-- entities/
|   |   |-- interfaces/
|   |   |-- feature-b.module.ts
|   |   |-- feature-b.service.ts
|   |   |-- feature-b.controller.ts
|   |   |-- tests/
|   |-- users/
|   |   |-- dto/
|   |   |   |-- inputs/
|   |   |   |-- outputs/
|   |   |-- entities/
|   |   |-- interfaces/
|   |   |-- users.module.ts
|   |   |-- users.service.ts
|   |   |-- users.controller.ts
|   |   |-- tests/
|-- shared/
|   |-- constants/
|   |-- decorators/
|   |-- filters/
|   |-- guards/
|   |-- interceptors/
|   |-- interfaces/
|   |-- strategies/
|   |-- utils/
```

### Root-Level Structure

- `app.module.ts`: The root module that integrates all the feature modules.
- `app.controller.ts`: The main controller for application-wide route handling.
- `app.service.ts`: The service at the application level for global business logic.
- `main.ts`: The entry file of the application which uses the NestFactory to create a Nest application instance.
