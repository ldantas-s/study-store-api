import express from 'express';

import { productRoutes } from './productRoutes.js';
import { customerRoutes } from './customerRoutes.js';
import { orderRoutes } from './orderRoutes.js';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.status(200).send({
    title: 'Node Store API',
    version: '0.0.1',
  });
});
routes.get('/terms', (req, res) => {
  res.status(200).send({
    message: "Let's have fun!",
  });
});

routes.use('/products', productRoutes);
routes.use('/customers', customerRoutes);
routes.use('/orders', orderRoutes);

export const routesV1 = routes;
