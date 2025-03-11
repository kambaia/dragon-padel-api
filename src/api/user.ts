import { Router } from 'express';
import userController from '../api/controllers/userController';
import { securetyUser } from '../middlewares/ensureAuthenticated';
import multer from 'multer';

import { configureStorage } from '../util/uploads/services';
const { storage } = configureStorage('../../../public/img/user');
const upload = multer({ storage: storage });

export const userRouter = Router();
userRouter.get('/user', userController.listAllUser);
userRouter.get('/user/:userId', userController.listOneUser);
userRouter.post('/user', upload.single('profile'), userController.saveUser);
userRouter.put('/user/:userId', userController.updateUser);
userRouter.put("/user-with-file/:userId", upload.single('profile'), userController.updateUserWithProfile);
userRouter.delete('/user/:userId', userController.deleteUser);

/***********************************************funcionjalidade do cadastro de funcionario  */
