FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

RUN npm install typescript tsconfig-paths tsc-alias -D \
    && npm run build

EXPOSE 8000

CMD ["node", "-r", "tsconfig-paths/register", "dist/index.js"]
