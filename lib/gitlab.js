'use strict';

const assert = require('assert');
const { Gitlab } = require('@gitbeaker/node');

module.exports = app => {
  app.addSingleton('gitlab', createOneClient);
};

function createOneClient(config, app) {
  assert(
    config.host && config.token,
    `[egg-gitlab] 'host: ${config.host}', 'token: ${config.token}',  are required on config`
  );

  const gitLab_config = {
    host: config.host,
    token: config.token,
  };

  const gitlab = new Gitlab(gitLab_config);

  app.beforeStart(async () => {
    try {
      const { version, revision } = await gitlab.Version.show();
      app.coreLogger.info(
        `[egg-gitlab] server version information:${version}-${revision}`
      );
    } catch (error) {
      app.coreLogger.info(`[egg-gitlab] error:${error}`);
    }
  });
  return gitlab;
}
