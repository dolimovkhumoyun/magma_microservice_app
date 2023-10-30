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

  async consumeFromQueue(queueName: string, messageHandler: (message: string, headers: any) => void) {
    if (this.channel) {
      this.channel.assertQueue(queueName, { durable: true });
      await this.channel.consume(queueName, (msg) => {
        if (msg !== null) {
          const message = msg.content.toString();
          const headers = msg.properties.headers;
          messageHandler(message, headers);
          this.channel?.ack(msg);
        }
      });
    } else {
      this.logger.error(`RabbitMQ was not initialized!`, 'Connection to RabbitMQ was not initialized!');
    }
  }

  async checkConnection() {
    try {
      const tmpConnection = await amqp.connect(this.connectionURL);
      tmpConnection.close();
      return true;
    } catch (error) {
      this.logger.error(`Connection failed`, error);
      return false;
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
