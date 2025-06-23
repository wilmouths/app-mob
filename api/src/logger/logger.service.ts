import { LoggerService } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';

export class PinoLoggerService implements LoggerService {
  private readonly logger: FastifyAdapter['instance']['log'];

  constructor(logger: FastifyAdapter['instance']['log']) {
    this.logger = logger;
  }

  log(message: string, context?: string): void {
    if (context) {
      this.logger.info({ context }, message);
    } else {
      this.logger.info(message);
    }
  }

  error(message: string, trace?: string, context?: string): void {
    const meta: Record<string, unknown> = {};
    if (context) meta.context = context;
    if (trace) meta.trace = trace;
    this.logger.error(meta, message);
  }

  warn(message: string, context?: string): void {
    if (context) {
      this.logger.warn({ context }, message);
    } else {
      this.logger.warn(message);
    }
  }

  debug(message: string, context?: string): void {
    if (context) {
      this.logger.debug({ context }, message);
    } else {
      this.logger.debug(message);
    }
  }

  verbose(message: string, context?: string): void {
    if (context) {
      this.logger.trace({ context }, message);
    } else {
      this.logger.trace(message);
    }
  }
}
