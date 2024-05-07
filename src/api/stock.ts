import { Router } from 'express';
import stockController from './controllers/stockController';
import movimentController from './controllers/movimentController';
export const stockRouter = Router();
stockRouter.get('/stock', stockController.listAllStock);
stockRouter.get('/graph', stockController.filterdataFromGraph)
stockRouter.get('/stock/:stockId', stockController.listOneStock); 
stockRouter.post('/stock', stockController.saveStock);
stockRouter.put('/stock/:stockId', stockController.updateStock);
stockRouter.delete('/stock/:stockId', stockController.deleteStock);


stockRouter.get('/moviment', movimentController.listAllMovement);
stockRouter.get('/stock/:productId', movimentController.listAllMovement); 

