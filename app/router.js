'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const API = app.router.namespace('/api/v2');

  API.post('/lockedCountdown', controller.home.lockedCountDown);
  API.post('/txsHistory', controller.home.txsHistory);
  API.post('/addTx', controller.home.addTx);
};
