import { NextFunction, Request, Response } from 'express';
import { catchReject } from '../../common/helpers';
import { createUserSchema, getUserSchema, updateUserSchema } from './schema';
import { UserService } from '../../services/users';
import { RabbitMQWrapper } from '../../common/rabbitmq-wrapper';

export const getUsers = catchReject(async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = getUserSchema.validate(req.body);
  if (error) {
    return next({ status: 400, message: error.details[0].message });
  }

  const users = await UserService.getUsers(value.pageNumber, value.itemsPerPage);
  return res.send({ status: 200, data: users });
});

export const getUser = catchReject(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.user_id;
  const user = await UserService.getUser(userId);

  return res.send({ status: 200, data: user });
});

export const createUser = catchReject(async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = createUserSchema.validate(req.body);
  if (error) {
    return next({ status: 400, message: error.details[0].message });
  }
  const users = await UserService.createUser(value);

  const rabbitMQ = RabbitMQWrapper.getInstance();
  await rabbitMQ.publishToQueue('user_updates', users, { messageType: 'created' });

  return res.send({ status: 200, data: users });
});

export const updateUser = catchReject(async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = updateUserSchema.validate(req.body);
  if (error) {
    return next({ status: 400, message: error.details[0].message });
  }

  const user = await UserService.updateUser(value);

  if (!user) {
    return next({ status: 404, message: 'User with such ID does not exist!' });
  }

  return res.send({ status: 200, data: user });
});

export const deleteUser = catchReject(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.id) {
    return next({ status: 400, message: 'Bad request!' });
  }

  const user = await UserService.deleteUser(req.body.id);
  if (!user) {
    return next({ status: 404, message: 'User with such ID does not exist!' });
  }
  const rabbitMQ = RabbitMQWrapper.getInstance();
  await rabbitMQ.publishToQueue('user_updates', user, { messageType: 'deleted' });
  return res.send({ status: 200, data: user });
});
