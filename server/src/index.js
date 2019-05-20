import express from 'express';
import DB from './db/';

require('@babel/polyfill');
const server = require('./server');
const createSocketApi = require('./socketApi');
const cors = require('cors');

const db = new DB();
db.init();

const app = express();
app.use(cors());

const { httpServer, apolloServer } = server.createServer(app);

createSocketApi({ httpServer });
