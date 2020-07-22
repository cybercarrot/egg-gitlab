'use strict';

const assert = require('assert');
const { Gitlab } = require('@gitbeaker/node');

module.exports = app => {
  app.addSingleton('gitLab', createOneClient);
};

function createOneClient(config, app) {
  assert(
    config.host && config.user && config.password,
    `[egg-gitLab] 'host: ${config.host}', 'user: ${config.user}', 'password: ${config.password}' are required on config`
  );

  const baseUrl = `http://${config.user}:${config.password}@${config.host}`;

  app.coreLogger.info(`[egg-gitLab] ${baseUrl}`);

  const gitLab_config = {
    baseUrl,
    promisify: config.promisify || true,
    crumbIssuer: config.crumbIssuer || false,
  };

  const gitLab = new Gitlab(gitLab_config);

  //   app.beforeStart(async () => {
  //     const { err, data } = await gitLab.info();
  //     if (err) throw err;
  //     app.coreLogger.info(`[egg-jenkins] instance server information:${data}`);
  //   });
  return gitLab;
}
