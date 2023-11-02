FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
RUN npm install -g npm@latest
RUN npm install
RUN npx prisma generate
COPY . .
ENV  DB_CONNECTION=${DB_CONNECTION}
ENV  DB_USERNAME=${DB_USERNAME}
ENV  DB_PASSWORD=${DB_PASSWORD}
ENV  DB_HOST=${DB_HOST}
ENV  DB_PORT=${DB_PORT}
ENV  DB_DATABASE=${DB_DATABASE}
EXPOSE 8080
CMD [ "node", "src/index.js" ]
