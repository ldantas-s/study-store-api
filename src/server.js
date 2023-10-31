'use strict';
import http from 'http';
import Debug from 'debug';

import { onListening } from './utils.js';

import app from './app.js';

const debug = Debug('nodebalta:server');
const PORT = app.get('port');
const server = http.createServer(app);

server.listen(PORT, () =>
  console.log(`🚀 Server on. http://localhost:${PORT}.`)
);
server.on('listening', onListening(server.address(), debug));
