# nest-microservice

## Description

A NestJS microservice boilerplate template for rapidly spinning up microservice projects.

## Installation

```bash
$ yarn install
```

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
src/
|-- app.module.ts
|-- app.controller.ts
|-- app.service.ts
|-- main.ts
|-- core/
|   |-- auth/
|   |   |-- auth.module.ts
|   |   |-- auth.service.ts
|   |   |-- jwt.strategy.ts
|   |   |-- jwt-auth.guard.ts
|   |-- config/
|   |   |-- config.module.ts
|   |   |-- config.service.ts
|   |   |-- configuration.interface.ts
|   |   |-- constants.ts
|   |   |-- env.config.ts
|   |   |-- development.env
|   |   |-- staging.env
|   |   |-- production.env
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

### Core Module

The `core` directory contains foundational modules and services that are critical to the application's functionality.

#### Auth

- `auth.module.ts`: Sets up the authentication module, integrating strategies and guards.
- `auth.service.ts`: Encapsulates the authentication logic.
- `jwt.strategy.ts`: Defines the JWT strategy for authentication.
- `jwt-auth.guard.ts`: Provides route guarding based on JWT tokens.

#### Config

- `config.module.ts`: Orchestrates configuration loading and provides a configuration service.
- `config.service.ts`: Service for accessing and validating environment variables and application configurations.
- `configuration.interface.ts`: TypeScript interface for type-safe configuration objects.
- `constants.ts`: Contains constants used throughout the application.
- `env.config.ts`: Maps environment variables to the configuration object.
- `development.env`, `staging.env`, `production.env`: Environment-specific files for setting up variables (not tracked in version control).

#### Database

- `migrations/`: Contains database migration scripts to evolve the database schema over time.
- `seeds/`: Includes scripts to seed the database with initial data.
- `sources/`: Data source configurations for different types of databases or APIs.

#### Resilience

- `circuit-breaker/`: Implements the circuit breaker pattern to prevent failure cascade.
- `retry/`: Provides retry logic for transient failures in inter-service communication or external API calls.

### Features Module

The `features` directory encapsulates the code related to specific business capabilities of the application.

#### Feature-A and Feature-B

- `dto/`: Data transfer objects for encapsulating the data sent over the network.
- `entities/`: Domain models representing the business entities.
- `interfaces/`: TypeScript interfaces for type safety and contract definition within the feature.
- `*.module.ts`: Feature-specific module files that bundle together controllers, services, and other providers.
- `*.service.ts`: Services containing business logic for the feature.
- `*.controller.ts`: Controllers that handle incoming HTTP requests and respond to the client.
- `tests/`: Test suites specific to the feature.

#### Users

- Structured similarly to other features, with a focus on user management functionality.

### Shared Module

The `shared` directory contains code and resources that are used across different parts of the application.

- `constants/`: Shared constants that can be used throughout the application.
- `decorators/`: Custom decorators to enhance classes, methods, or parameters.
- `filters/`: Exception filters for catching and handling exceptions.
- `guards/`: Guards for implementing access control logic.
- `interceptors/`: Interceptors for adding extra logic before or after method execution.
- `interfaces/`: Shared interfaces for consistent contract definitions.
- `strategies/`: Strategies for authentication or other cross-cutting concerns.
- `utils/`: Utility functions that provide common functionalities.

### Conclusion

This structure is designed to promote a clean separation of concerns, modularity, and ease of testing. It aligns with both Domain-Driven Design principles and the NestJS modular architecture, facilitating scalability and maintainability as the application grows. Each module and service should be self-contained, with clear and single-responsibility principles guiding their implementation.



