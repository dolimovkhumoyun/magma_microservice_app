import winston from 'winston';
import { getEnvProperty } from './helpers';
import { EnvProperty } from '../types/enums';

const DEFAULTS = {
  PRODUCTION: 'PRODUCTION',
  DEV: 'DEV',
};

export class Logger {
  private logger: winston.Logger;
  private label: string;

  constructor(label: string) {
    this.label = label;
    const transports =
      getEnvProperty(EnvProperty.NODE_ENV) === DEFAULTS.PRODUCTION
        ? [
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'combined.log' }),
          ]
        : [
            new winston.transports.Console({
              format: winston.format.simple(),
            }),
          ];
    this.logger = winston.createLogger({
      format: winston.format.json(),
      transports: transports,
    });
  }

  info(message: string) {
    this.logger.info(`[${this.label}]: ${message}`);
  }

  warn(message: string) {
    this.logger.warn(`[${this.label}]: ${message}`);
  }

  error(message: string, err: any) {
    let logMsg = `[${this.label}]: ${message}\n\n`;
    if (err instanceof Error) {
      logMsg += `[${err.name}]: ${err.message}\n\nStack: ${err.stack}`;
    } else if (typeof err === 'string') {
      logMsg += ` ${err}`;
    }
    this.logger.error(logMsg);
  }
}
