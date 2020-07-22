'use strict';

const gitlab = require('./lib/gitlab');

module.exports = app => {
  if (app.config.gitlab.app) gitlab(app);
};
