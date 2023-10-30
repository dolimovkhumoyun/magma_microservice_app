import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';

import { ErrorCustom } from '../types/errors';
import { errorMessageHandler, getEnvProperty } from '../common/helpers';

import users from '../routes/users';
import { Logger } from '../common/logger';
import { EnvProperty } from '../types/enums';

export const expressInit = () => {
  const PORT = getEnvProperty(EnvProperty.APP_PORT);
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  const logger = new Logger('Startup');

  app.use('/users', users);

  app.use((req, res) => {
    return res.status(404).send({ message: 'Not found!' });
  });

  // If error is thrown inside routes
  app.use((err: ErrorCustom, req: Request, res: Response, next: NextFunction) => {
    if (err.status) {
      logger.error(`Error occured!`, JSON.stringify(err));
      const error = errorMessageHandler(err.status, err.message);
      return res.status(err.status).send(error);
    } else {
      logger.error(`Error occured`, err);
      return res.status(500).send(err);
    }
  });
  http.createServer(app).listen(PORT, () => logger.info(`http server started on port: ${PORT}`));
};
