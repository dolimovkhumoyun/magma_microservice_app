import { NextFunction, Request, Response } from 'express';
import { catchReject } from '../../common/helpers';
import { RabbitMQWrapper } from '../../common/rabbitmq-wrapper';

export const getHealthCheckStatuses = catchReject(async (req: Request, res: Response, next: NextFunction) => {
  const rabbitMQ = RabbitMQWrapper.getInstance();

  const rabbitMqConnection = await rabbitMQ.checkConnection();

  const statuses = {
    RabbitMQ: rabbitMqConnection,
    UserService: true,
  };
  return res.send({ status: 200, data: statuses });
});
