import { Logger } from '../common/logger';

export interface UserMessage {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface UserMessageProps {
  messageType: 'created' | 'deleted';
}

export const createdUserConsumer = async (message: UserMessage) => {
  const logger = new Logger('User Consumer');
  logger.info(`Received message: ${JSON.stringify(message)}`);
};
