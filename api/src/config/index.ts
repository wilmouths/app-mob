import application from './application.config';
import database from './database.config';
import logger from './logger.config';

const configFiles = {
  app: application,
  database,
  logger,
};

export const conf = Object.keys(configFiles).reduce(
  (obj, key) => ({ ...obj, [key]: configFiles[key]() }),
  {},
);

export default [application, database, logger];
