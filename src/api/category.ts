import { Router } from 'express';
import categoryController from './controllers/categoryController';

export const categoryRouter = Router();
categoryRouter.get('/category', categoryController.listAllCategory);
categoryRouter.get('/category/:categoryId', categoryController.listOneCategory);
categoryRouter.post('/category', categoryController.saveCategory);
categoryRouter.put('/category/:categoryId', categoryController.updateCategory);
categoryRouter.delete('/category/:categoryId', categoryController.deleteCategory);
