FROM node:16-alpine

ENV NODE_ENV=production
ENV SITE="https://app.thrivetogether.xyz"
ENV ASTRO_DEV_PORT=4321
ENV PORT=4321
ENV PROD=true

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install -s --production --frozen-lockfile --ignore-optional

COPY . .

RUN yarn build

CMD ["node", "./dist/server/entry.mjs"]
