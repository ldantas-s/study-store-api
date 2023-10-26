import express from 'express';

import * as controller from '../controllers/orderController.js';
import * as AuthService from '../services/authService.js';

const orderRoutes = express.Router();

orderRoutes.get('/', AuthService.authorize, controller.getAll);
orderRoutes.post('/', AuthService.authorize, controller.create);

export { orderRoutes };
