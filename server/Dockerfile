#FROM node AS development
FROM node:16-slim AS development

WORKDIR /server

COPY package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

RUN apt-get update && apt-get install -y openssl libssl-dev
RUN npm install

COPY . .

EXPOSE 4000

RUN npm run build
RUN npx prisma generate
RUN npx prisma migrate deploy
CMD [ "npm", "run", "start" ]
#CMD [ "node", "dist/main" ]
