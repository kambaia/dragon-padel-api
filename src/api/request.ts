import { Router } from 'express';
import RequestController from './controllers/requestController';

export const RequestRouter = Router();
RequestRouter.get('/request', RequestController.listAllRequestt);
RequestRouter.get('/request/:request', RequestController.listOneRequest);
RequestRouter.post('/request', RequestController.saveRequest);
RequestRouter.put('/request/:request', RequestController.updateRequestt);
RequestRouter.delete('/request/:request', RequestController.deleteRequest);
