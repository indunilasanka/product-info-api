import mysql2 from 'mysql2';
import Sequelize from 'sequelize';
import { createNamespace } from 'cls-hooked';
import { dbConfigs } from '../config/configs';

export default class DbManager {
  static init() {
    const cls = createNamespace('namespace');
    Sequelize.useCLS(cls);
    DbManager.poolObj = new Sequelize(dbConfigs.database, dbConfigs.user, dbConfigs.password, {
      host: dbConfigs.host,
      port: dbConfigs.port,
      dialect: 'mysql',
      dialectModule: mysql2,
      operatorsAliases: 0,
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 10000,
      },
    });
  }

  static getConnectionPool() {
    return DbManager.poolObj;
  }
}
