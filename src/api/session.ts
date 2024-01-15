import { Router } from 'express';
import authUsersController from './controllers/authUsersController';

/********************************authintication ************************ */
export const sessionRouter = Router();
sessionRouter.post('/session', authUsersController.auth);
