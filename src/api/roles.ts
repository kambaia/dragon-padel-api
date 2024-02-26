import { Router } from 'express';
import rolesController from '../api/controllers/rolesControllers';
export const roleRouter = Router();
roleRouter.get('/role', rolesController.listRoles);
roleRouter.get('/role/:roleId', rolesController.listOne);
roleRouter.post('/role', rolesController.saveRoles);
roleRouter.put('/role/:roleId', rolesController.updateRole);
roleRouter.delete('/role/:roleId', rolesController.deleteRole);
