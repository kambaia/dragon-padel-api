import { Router } from 'express';
import RequestController from './controllers/requestController';

export const RequestRouter = Router();
RequestRouter.get('/request', RequestController.listAllRequest);
RequestRouter.get('/request/:requestId', RequestController.listOneRequest);
RequestRouter.post('/request', RequestController.saveRequest);
RequestRouter.put('/request/:requestId', RequestController.updateRequest);
RequestRouter.delete('/request/:requestId', RequestController.deleteRequest);
