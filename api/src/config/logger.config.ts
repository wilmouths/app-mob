import { registerAs } from '@nestjs/config';

export default registerAs('logger', () => ({
  level: process.env.LOGGER_LEVEL || 'info',
}));
