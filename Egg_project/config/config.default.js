/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1700546846454_4246";

  // add your middleware config here
  config.middleware = ["verifyToken", "errorHandler"];
  config.verifyToken = {
    enable: true,
    ignore: ["/login", "/logout"],
  };
  config.errorHandler = {
    enable: true,
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.jwt = {
    secret: "admin123456",
  };

  // mysql
  // config.sequelize = {
  //   dialect: 'mysql',
  //   host: '127.0.0.1',
  //   port: 3306,
  //   username: 'root',
  //   password: 'root',
  //   database: 'test'
  // }

  // mongodb
  exports.mongoose = {
    client: {
      url: "mongodb://127.0.0.1:27017/user",
      options: {},
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
