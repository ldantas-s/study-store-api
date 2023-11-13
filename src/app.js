'use strict';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import 'dotenv/config.js';

import { normalizePort } from './utils/normalizePort.js';

import { routesV1 } from './routes/index.js';
import { cors } from './middlewares/cors.js';
import { logErrors, handleErrors } from './middlewares/errors.js';

const SwaggerDocsv2 = require('./docs/swagger-output.json');
const app = express();
const PORT = normalizePort(process.env.PORT);

app.set('port', PORT);
app.use(express.json());

app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(SwaggerDocsv2));

app.use(cors);

https: app.use('/v1', routesV1);

app.use(logErrors);
app.use(handleErrors);

export default app;
