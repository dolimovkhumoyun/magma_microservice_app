import mongoose from 'mongoose';
import { getEnvProperty } from '../common/helpers';
import { EnvProperty } from '../types/enums';
import { Logger } from '../common/logger';

export const mongoInit = async () => {
  const connectionUrl = getEnvProperty(EnvProperty.MONGO_URL);
  const logger = new Logger('Mongo INIT');
  await mongoose.connect(connectionUrl);
  logger.info(`Connected to ${connectionUrl}...`);
};

export const checkMongoConnection = async () => {
  const logger = new Logger('Mongo Check Connection');
  try {
    const connectionUrl = getEnvProperty(EnvProperty.MONGO_URL);
    const tmpConnection = await mongoose.connect(connectionUrl);
    await tmpConnection.disconnect();
    return true;
  } catch (error) {
    logger.error(`Connection Check failed.`, error);
    return false;
  }
};
