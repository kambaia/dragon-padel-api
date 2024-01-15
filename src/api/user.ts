import { Router } from 'express';
import userController from '../api/controllers/userController';
import { securetyUser } from '../middlewares/ensureAuthenticated';

export const userRouter = Router();
userRouter.get('/user', userController.listAllUser);
userRouter.get('/user/:userId', userController.listOneUser);
userRouter.post('/user', userController.saveUser);
userRouter.put('/user/:userId', userController.updateUser);
userRouter.delete('/user/:userId', userController.deleteUser);
