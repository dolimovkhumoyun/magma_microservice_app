import { RabbitMQWrapper } from '../common/rabbitmq-wrapper';
import { expressInit } from './expressInit';
import { queueListenerInit } from './queueListenerInit';

export const initHandler = async () => {
  return new Promise<void>(async (resolve, reject) => {
    Promise.all([RabbitMQWrapper.getInstance().init()]).then(() => resolve());
  })
    .then(() => {
      expressInit();
      queueListenerInit();
    })
    .catch((err) => {
      throw new Error(`InitHandler failed to start`);
    });
};
