import { Router } from 'express';
import stockController from './controllers/stockController';
export const stockRouter = Router();
stockRouter.get('/stock', stockController.listAllStock);
stockRouter.get('/stock/:productId', stockController.listOneStock); 
stockRouter.post('/stock', stockController.saveStock);
stockRouter.put('/stock/:productId', stockController.updateStock);
stockRouter.delete('/stock/:productId', stockController.deleteStock);
