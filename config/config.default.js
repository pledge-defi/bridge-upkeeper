/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1640914999651_621';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.cluster = {
    listen: {
      path: '',
      port: 8080,
      hostname: '0.0.0.0',
    },
  };

  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
      ignoreJSON: false,
    },
  };

  config.sequelize = {
    username: 'bridge',
    password: 'bridge',
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    database: 'bridge',
  };

  return {
    ...config,
    ...userConfig,
  };
};
