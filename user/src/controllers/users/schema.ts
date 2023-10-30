import Joi from 'joi';

export const getUserSchema = Joi.object({
  pageNumber: Joi.number().optional().min(1).default(1),
  itemsPerPage: Joi.number().optional().default(10),
});

export const createUserSchema = Joi.object({
  name: Joi.string().required().min(4),
  email: Joi.string().required().email().min(5),
  createdAt: Joi.string().default(new Date()),
});

export const updateUserSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().optional().min(4).max(20),
  email: Joi.string().optional().email().min(5).max(14),
  createdAt: Joi.string().optional(),
});
