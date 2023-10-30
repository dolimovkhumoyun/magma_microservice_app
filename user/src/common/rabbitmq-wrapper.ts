import * as amqp from 'amqplib';
import { getEnvProperty } from './helpers';
import { EnvProperty } from '../types/enums';
import { Logger } from './logger';

export class RabbitMQWrapper {
  private connection?: amqp.Connection;
  private channel?: amqp.Channel;
  private static instance: RabbitMQWrapper;
  private logger: Logger;

  constructor(private connectionURL: string) {
    this.logger = new Logger('RabbitMQ Wrapper');
  }

  static getInstance(): RabbitMQWrapper {
    if (!RabbitMQWrapper.instance) {
      RabbitMQWrapper.instance = new RabbitMQWrapper(getEnvProperty(EnvProperty.RABBITMQ_URL));
    }
    return RabbitMQWrapper.instance;
  }

  async init() {
    try {
      this.connection = await amqp.connect(this.connectionURL);
      this.channel = await this.connection.createChannel();
      this.logger.info('Connection was successfully established with RabbitMQ.');
    } catch (error: any) {
      this.logger.error('Error occured while connecting to RabbitMQ', error);
    }
  }

  async publishToQueue(queueName: string, message: any, messageProps: any) {
    if (this.channel) {
      this.channel.assertQueue(queueName, { durable: true });
      this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
        persistent: true,
        headers: messageProps,
      });
      this.logger.info(`Published to queue ${queueName}`);
    } else {
      this.logger.error(`RabbitMQ was not initialized!`, 'Connection to RabbitMQ was not initialized!');
    }
  }

  async close() {
    if (this.channel) {
      await this.channel.close();
      this.logger.info('Channel is closed!');
      if (this.connection) {
        this.connection.close();
        this.logger.info('Connection is closed!');
      }
    }
  }
}
