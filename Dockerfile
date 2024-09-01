FROM node:20.17.0-alpine AS base

RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

FROM base AS development

RUN pnpm install

EXPOSE 5173
CMD ["pnpm", "run", "dev", "--host", "--", "--open"]

FROM base AS production

RUN pnpm run build
RUN pnpm prune --prod

FROM node:20.17.0-alpine AS final

WORKDIR /app

COPY --from=production /app/build ./build
COPY --from=production /app/node_modules ./node_modules
COPY --from=production /app/package.json .

EXPOSE 3000
CMD ["node", "build"]
