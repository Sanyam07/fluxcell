import { createServer } from './apolloServer';

const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const chalk = require('chalk');
const express = require('express');

module.exports.createServer = (app) => {
  app.use(express.static(path.join(__dirname, './')));
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());

  const DEFAULT_PORT_HTTP = 4444;

  const httpServer = http.createServer(app);
  const portHttp = process.env.PORT_HTTP || DEFAULT_PORT_HTTP;
  app.set('portHttp', portHttp);

  httpServer.listen(app.get('portHttp'), () =>
    console.log(chalk.green(`Dev api server listening on http://localhost:${portHttp}`))
  );

  // Create apollo server
  const apolloServer = createServer(app);

  return {
    httpServer,
    apolloServer,
  };
};
