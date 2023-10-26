import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.status(200).send({
    title: 'Node Store API',
    version: '0.0.1',
  });
});

export { routes };

export { productRoutes } from './productRoutes.js';
export { customerRoutes } from './customerRoutes.js';
export { orderRoutes } from './orderRoutes.js';
