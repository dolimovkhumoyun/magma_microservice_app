import * as dotenv from 'dotenv';

dotenv.config();

type configType = {
  APP_PORT: string;
  NODE_ENV: string;
  RABBITMQ_URL: string;
  USER_UPDATES_QUEUE: string;
};

const config: configType = {
  APP_PORT: process.env.APP_PORT,
  NODE_ENV: process.env.NODE_ENV,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  USER_UPDATES_QUEUE: process.env.USER_UPDATES_QUEUE,
};

export default config;
