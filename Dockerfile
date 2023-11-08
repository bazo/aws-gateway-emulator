#FROM oven/bun:latest as builder
FROM node:alpine as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN apk update ; apk upgrade ; apk add --no-cache \
  python3-dev

# COPY package.json ./
# COPY bun.lockb ./
# COPY app ./
# COPY public ./

COPY . ./

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS builder
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM node:alpine
COPY --from=prod-deps node_modules node_modules

COPY --from=builder build build
COPY --from=builder public public
#COPY --from=builder node_modules /.
COPY --from=builder server.js server.js
COPY --from=builder package.json package.json

EXPOSE 3000

CMD ["node", "server.js"]
