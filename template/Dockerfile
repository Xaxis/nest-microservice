# Use the official Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:16

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# Ensure both package.json AND yarn.lock are copied.
# Copying this separately prevents re-running yarn install on every code change.
COPY package.json yarn.lock ./

# Install dependencies based on the NODE_ENV. Default is production.
ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}

# Install dev dependencies if in development mode.
RUN if [ "$NODE_ENV" = "dev" ]; \
        then yarn install; \
        else yarn install --production; \
    fi

# Copy local code to the container image.
COPY . .

# Build the app if in production mode.
RUN if [ "$NODE_ENV" = "prod" ]; then yarn build; fi

# Start command differs based on the NODE_ENV.
CMD if [ "$NODE_ENV" = "prod" ]; \
        then node dist/main; \
        else yarn start:dev; \
    fi