import { Router } from 'express';
import rolesControllers from './controllers/rolesControllers';

export const roleRouter = Router();
roleRouter.get('/role', rolesControllers.listRoles);
roleRouter.get('/role/:roleId', rolesControllers.listOne);
roleRouter.post('/role', rolesControllers.saveRoles);
roleRouter.put('/role/:roleId', rolesControllers.updateRole);
roleRouter.delete('/role/:roleId', rolesControllers.deleteRole);
