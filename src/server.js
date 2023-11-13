'use strict';
import http from 'http';
import Debug from 'debug';
import mongoose from 'mongoose';

import { onListening } from './utils.js';

import app from './app.js';

const debug = Debug('nodebalta:server');
const PORT = app.get('port');
const server = http.createServer(app);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    dbName: process.env.NODE_ENV,
  })
  .then(() => {
    console.log(`✅ Mongo connection with success. db ${process.env.NODE_ENV}`);
  })
  .catch((error) => console.error(error));

server.listen(PORT, () =>
  console.log(`🚀 Server on. http://localhost:${PORT}.`)
);
server.on('listening', onListening(server.address(), debug));
