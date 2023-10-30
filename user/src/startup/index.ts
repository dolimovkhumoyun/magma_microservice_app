import { RabbitMQWrapper } from '../common/rabbitmq-wrapper';
import { expressInit } from './expressInit';
import { mongoInit } from './mongoInit';

export const initHandler = async () => {
  return new Promise<void>(async (resolve, reject) => {
    Promise.all([RabbitMQWrapper.getInstance().init(), mongoInit()]).then(() => resolve());
  })
    .then(() => {
      expressInit();
    })
    .catch((err) => {
      throw new Error(`InitHandler failed to start`);
    });
};
