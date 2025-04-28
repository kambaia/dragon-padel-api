import { Router } from 'express';
import userController from '../api/controllers/userController';
import { securetyUser } from '../middlewares/ensureAuthenticated';
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

export const userRouter = Router();

userRouter.post('/user', upload.fields([
  { name: 'profilePicture', maxCount: 1 },
]),  userController.createUser);

userRouter.get('/user', userController.listAllUser);
userRouter.get('/user/:userId', userController.listOneUser);
userRouter.put('/user/:userId', userController.updateUser);
userRouter.put("/user-with-file/:userId", upload.single('profile'), userController.updateUserWithProfile);
userRouter.delete('/user/:userId', userController.deleteUser);

/***********************************************funcionjalidade do cadastro de funcionario  */
