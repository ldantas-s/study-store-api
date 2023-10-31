'use strict';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';

import 'dotenv/config.js';

import { normalizePort } from './utils.js';

import { routesV1 } from './routes/index.js';

const SwaggerDocsv2 = require('./docs/swagger-output.json');
const app = express();
const PORT = normalizePort(process.env.PORT);

app.set('port', PORT);
app.use(express.json());

app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(SwaggerDocsv2));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-requested-With, Content-Type, Accept, x-access-token'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log('✅ Mongo connection with success.'))
  .catch((error) => console.error(error));

app.use('/v1', routesV1);

export default app;
