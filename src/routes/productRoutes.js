import express from 'express';
import * as controller from '../controllers/productController.js';
import * as AuthService from '../services/authService.js';

const productRoutes = express.Router();

productRoutes.get('/', controller.getAll);
productRoutes.get('/:slug', controller.getBySlug);
productRoutes.get('/admin/:id', controller.getById);
productRoutes.get('/tags/:tag', controller.getByTag);
productRoutes.post('/', AuthService.isAdmin, controller.post);
productRoutes.put('/:id', AuthService.isAdmin, controller.put);
productRoutes.delete('/', AuthService.isAdmin, controller.del);

export { productRoutes };
