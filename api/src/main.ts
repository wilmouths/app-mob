import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const config = app.get<ConfigService>(ConfigService);

  const port = config.get<number>('app.port');
  if (!port) {
    throw new Error('Missing required config: app.port');
  }

  app.useLogger(app.get(Logger));

  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());

  await app.listen(port);
}
bootstrap();
