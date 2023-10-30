import { NextFunction, Request, Response } from 'express';
import config from '../config';
import { EnvProperty } from '../types/enums';
import { Logger } from './logger';

export const errorMessageHandler = (status: number, message: string | null) => {
  switch (status) {
    case 400:
      return {
        status,
        type: 'ValidationError',
        message: {
          en: `Invalid Parameters: ${message}`,
        },
      };
    case 403:
      return {
        status,
        type: 'PermissionDeniedError',
        message: {
          en: `Message: ${message}`,
        },
      };
    case 500:
      return {
        status,
        type: 'ServerError',
        message: { en: 'Internal server error' },
        error: message,
      };
    case 404:
      return {
        status,
        type: 'NotFound',
        message: { en: 'Not Found' },
        error: message,
      };
    default:
      return {
        status,
        type: 'ServerError',
        message: { en: 'Internal server error' },
        error: message,
      };
  }
};

export const catchReject = (func: any) => async (req: Request, res: Response, next: NextFunction) => {
  const logger = new Logger('CatchReject');
  try {
    await func(req, res, next);
    if (res.headersSent) {
      return null;
    }
    return next();
  } catch (error: any) {
    logger.error(`Error occured while handling request!`, error);
    return next({ status: 500, message: String(error) });
  }
};

export const getEnvProperty = (property: EnvProperty) => {
  if (!config[property]) {
    throw new Error(`ENV VAR: ${property} does not exist!`);
  }
  return config[property];
};
