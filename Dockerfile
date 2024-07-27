# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.1.20
FROM oven/bun:${BUN_VERSION}-slim as base

LABEL fly_launch_runtime="Bun"

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
# RUN apt-get update -qq && \
#   apt-get install --no-install-recommends -y build-essential pkg-config python-is-python3

# Install node modules
# COPY --link bun.lockb package.json yarn.lock ./
COPY --link bun.lockb package.json ./
RUN bun install --frozen-lockfile --ci

# Copy application code
COPY --link . .


# Final stage for app image
FROM base

# Install packages needed for deployment
# apt-get install --no-install-recommends -y ffmpeg && \
# RUN apt-get update -qq && \
#    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built application
COPY --from=build /app /app

ENV ASTRO_DEV_PORT=4321
ENV PORT=4321
ENV SITE=http://app.thrivetogether.ai
# Start the server by default, this can be overwritten at runtime
EXPOSE 4321
CMD [ "bun", "run", "start" ]