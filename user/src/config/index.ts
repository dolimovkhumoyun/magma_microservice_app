import * as dotenv from 'dotenv';

dotenv.config();

type configType = {
  APP_PORT: string;
  NODE_ENV: string;
  MONGO_URL: string;
  RABBITMQ_URL: string;
};

const config: configType = {
  APP_PORT: process.env.APP_PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URL: process.env.MONGO_URL,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
};

export default config;
