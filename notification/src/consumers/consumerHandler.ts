import { Logger } from '../common/logger';
import { UserMessage, UserMessageProps, createdUserConsumer } from './created-user';
import { deletedUserConsumer } from './deleted-user';

const consumerHandler = async (message: UserMessage, headers: UserMessageProps) => {
  const logger = new Logger('Message Consumer Handler');
  switch (headers.messageType) {
    case 'created':
      await createdUserConsumer(message);
    case 'deleted':
      await deletedUserConsumer(message);
    default:
      logger.warn('Unexpected message type!');
  }
};
