FROM node:20.17.0-alpine AS base

RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

FROM base AS development

EXPOSE 5173
CMD ["pnpm", "run", "dev", "--host", "--", "--open"]

FROM base AS final

WORKDIR /app

RUN pnpm run build
RUN pnpm prune --prod

EXPOSE 5173
CMD ["sh", "-c", "PORT=5173 node build"]

