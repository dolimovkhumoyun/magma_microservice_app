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
