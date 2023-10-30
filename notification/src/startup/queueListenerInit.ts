import { getEnvProperty } from '../common/helpers';
import { RabbitMQWrapper } from '../common/rabbitmq-wrapper';
import { EnvProperty } from '../types/enums';

export const queueListenerInit = () => {
  const rabbitMQ = RabbitMQWrapper.getInstance();
  rabbitMQ.consumeFromQueue(getEnvProperty(EnvProperty.USER_UPDATES_QUEUE), (message, headers) => {
    console.log('Meessage', JSON.parse(message), headers);
  });
};
