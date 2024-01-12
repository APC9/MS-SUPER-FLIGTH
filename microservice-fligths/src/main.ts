import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { RabbitMQ } from './common/constants';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main-flights');
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.AMQP_URL],
      queue: RabbitMQ.FlightQueue,
    },
  });
  await app.listen();
  logger.log('microservices - flights is listen');
}
bootstrap();
