import { Router } from 'express';
import deliveryController from './controllers/deliveryController';
export const deliveryRouter = Router();
deliveryRouter.get('/delivery', deliveryController.listAllDelivery);
deliveryRouter.get('/delivery/:deliveryId', deliveryController.listOneDelivery);
deliveryRouter.post('/delivery', deliveryController.saveDelivery);
deliveryRouter.put('/delivery/:deliveryId', deliveryController.deleteDelivery);
deliveryRouter.delete(
  '/delivery/:deliveryId',
  deliveryController.deleteDelivery
);
