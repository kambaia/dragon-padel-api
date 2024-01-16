import { Router } from 'express';
import departmentController from './controllers/departmentController';

export const departmentRouter = Router();
departmentRouter.get('/department', departmentController.listAllDepartament);
departmentRouter.get(
  '/department/:departmentId',
  departmentController.listOneDepartment
);
departmentRouter.post('/department', departmentController.saveDepartment);
departmentRouter.put(
  '/department/:departmentId',
  departmentController.updateDepartament
);
departmentRouter.delete(
  '/department/:departmentId',
  departmentController.deleteDepartment
);
