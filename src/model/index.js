import DataTypes from 'sequelize';
import logger from '../util/logger';
import DbManager from '../resource/dbManager';

const models = {};
const modelFiles = ['product', 'brand'];

export const modelInitializer = async () => {
  logger.info('- model initialization start');
  const sequelize = DbManager.getConnectionPool();

  modelFiles
    .forEach((file) => {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const sequelizeModel = require(`./${file}.js`).default(sequelize, DataTypes);
      models[sequelizeModel.name] = sequelizeModel;
    });

  models.product.belongsTo(models.brand, { foreignKey: 'brandId' });

  logger.info('- model initialization  complete');
  return 'done';
};

export const getEntity = (moduleName) => models[moduleName];
export const getSequelize = () => DbManager.getConnectionPool();
