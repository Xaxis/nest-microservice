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

## Running Docker

- Use `yarn docker:build:dev` to build your Docker image for development.
- Use `yarn docker:build:prod` to build your Docker image for production.
- Use `yarn docker:compose:build` to build services defined in your docker-compose.yml.
- Use `yarn docker:compose:up` to start services defined in your docker-compose.yml.
- Use `yarn docker:compose:down` to stop and remove containers, networks, images, and volumes defined in your docker-compose.yml.
- Use `yarn docker:compose:up:detached` to start services defined in docker-compose.yml in detached mode (running in the background).

## Running the app



