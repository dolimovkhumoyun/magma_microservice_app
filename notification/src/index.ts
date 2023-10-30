import { getEnvProperty } from './common/helpers';
import { RabbitMQWrapper } from './common/rabbitmq-wrapper';
import { initHandler } from './startup';
import { EnvProperty } from './types/enums';

initHandler();
