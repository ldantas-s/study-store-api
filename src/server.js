'use strict';

import http from 'http';
import Debug from 'debug';
import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';

import 'dotenv/config.js';

import SwaggerDocsv2 from './docs/swagger-output.json' assert { type: 'json' };
import { routesV1 } from './routes/index.js';

const debug = Debug('nodebalta:server');

const app = express();
const PORT = normalizePort(process.env.PORT);

app.set('port', PORT);
app.use(express.json());

app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(SwaggerDocsv2));

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log('✅ Mongo connection with success.'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-requested-With, Content-Type, Accept, x-access-token'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/v1', routesV1);

server.listen(PORT, () =>
  console.log(`🚀 Server on. http://localhost:${PORT}.`)
);
server.on('listening', onListening);

function normalizePort(value = 3000) {
  const port = parseInt(value, 10);

  if (isNaN(port)) return port;
  if (port >= 0) return port;

  return false;
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

  debug('listening on', bind);
}
