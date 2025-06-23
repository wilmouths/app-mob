import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { PinoLoggerService } from './logger/logger.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const fastifyAdapter: FastifyAdapter = new FastifyAdapter({
    logger: true,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    {
      bufferLogs: true,
    },
  );

  app.useLogger(new PinoLoggerService(fastifyAdapter.getInstance().log));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap()
  .then(() => Logger.log('Server run'))
  .catch((err) => Logger.error(err));
