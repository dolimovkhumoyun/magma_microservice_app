namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    APP_PORT: string;
    MONGO_URL: string;
    RABBITMQ_URL: string;
    USER_UPDATES_QUEUE: string;
  }
}

declare namespace Express {
  export interface Request {
    headers: {
      authorization: string;
    };
    user: any;
  }
}
