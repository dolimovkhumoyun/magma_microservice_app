import { Logger } from '../common/logger';
import { UserMessage } from './created-user';

export const deletedUserConsumer = async (message: UserMessage) => {
  const logger = new Logger('User Deleted');
  logger.info(`Received message: ${JSON.stringify(message)}`);
};
