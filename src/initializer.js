import logger from './util/logger';
import DbManager from './resource/dbManager';
import { modelInitializer } from './model/index';

export default async function initializer(app) {
  logger.info('Initialization start');
  try {
    // Initiates the DBManager with connection pools
    DbManager.init();

    // Database connection
    const sequelize = DbManager.getConnectionPool();
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');

    // // initialize sequelize models
    await modelInitializer();

    logger.info('Initialization complete');

    app.emit('ready');
  } catch (error) {
    logger.error(`application initialization failed with ${error}`);
    throw error;
  }
}
