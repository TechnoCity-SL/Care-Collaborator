FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Production image ─────────────────────────────────────────────────────────
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules

# Full dist: admin panel bundle (index.html + hashed JS/CSS) + compiled TS
COPY --from=build /app/dist ./dist

# Strapi reads lifecycle hooks + content-type schemas from ./src at runtime
COPY --from=build /app/dist/src ./src

# Strapi reads config from ./config at runtime (must be .js, not .ts)
COPY --from=build /app/dist/config ./config

COPY --from=build /app/tsconfig.json ./tsconfig.json
COPY --from=build /app/database ./database
COPY --from=build /app/public ./public
COPY --from=build /app/favicon.png ./favicon.png

EXPOSE 1337

CMD ["npm", "run", "start"]
