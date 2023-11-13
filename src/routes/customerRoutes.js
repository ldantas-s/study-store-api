import express from 'express';

import * as controller from '../controllers/customerController.js';
import * as AuthService from '../services/authService.js';

const customerRoutes = express.Router();

customerRoutes.get('/', controller.getCustomerData);
customerRoutes.post('/', controller.create);
customerRoutes.put('/', AuthService.authorize, controller.update);
customerRoutes.post('/login', controller.login);
customerRoutes.post(
  '/refresh-token',
  AuthService.authorize,
  controller.refreshToken
);

export { customerRoutes };
