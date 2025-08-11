# --- Build stage ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

RUN npm install -g tsc-alias typescript tsconfig-paths
RUN npx tsc && tsc-alias -p tsconfig.json

# --- Production stage ---
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 8000

CMD ["node", "-r", "tsconfig-paths/register", "dist/index.js"]
