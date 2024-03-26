import { Router } from 'express';
import stockController from './controllers/stockController';
import movimentController from './controllers/movimentController';
export const stockRouter = Router();
stockRouter.get('/stock', stockController.listAllStock);
stockRouter.get('/stock/:productId', stockController.listOneStock); 
stockRouter.post('/stock', stockController.saveStock);
stockRouter.put('/stock/:productId', stockController.updateStock);
stockRouter.delete('/stock/:productId', stockController.deleteStock);


stockRouter.get('/moviment', movimentController.listAllMovement);
stockRouter.get('/stock/:productId', movimentController.listAllMovement); 

