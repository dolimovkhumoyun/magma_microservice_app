FROM node:18-alpine

WORKDIR /app
RUN apk --no-cache add curl
RUN apk --no-cache add jq
COPY ./package.json .
COPY ./src ./src
COPY ./tsconfig.json .
COPY ./.env .
RUN npm install
RUN npm run build

ENV APP_PORT=8081
ENV RABBITMQ_URL=amqp://rabbitmq
ENV USER_UPDATES_QUEUE=user_updates
ENV NODE_ENV=production
EXPOSE 8081
CMD ["node", "dist/index.js"]