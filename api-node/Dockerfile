FROM node:lts-alpine3.21 AS build

RUN apk add --no-cache openssl vim bash

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm build

FROM node:lts-alpine3.21

RUN apk add --no-cache openssl vim bash tzdata

ENV TZ=America/Fortaleza

WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/pnpm-lock.yaml ./
COPY --from=build /app/prisma /app/prisma ./

RUN npm install -g pnpm

EXPOSE 3000

CMD ["pnpm", "start"]