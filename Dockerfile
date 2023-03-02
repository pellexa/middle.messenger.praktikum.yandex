FROM node:19.7.0-buster-slim AS messenger_nodejs

WORKDIR /messenger
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["node", "server.js"]
