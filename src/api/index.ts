import express from 'express';
import { roleRouter } from './roles';
import { userRouter } from './user';
import { sessionRouter } from './session';
import { participantRouter } from './participant';
import { reservationRouter } from './reservation';
import routerProduct from './product';
import routerInstructor from './instructor';

const router = express.Router();

router.get('/', (req, res) => {
  return res.send({
    message: "Seja bem vido"
  });
});

router.use(sessionRouter);
router.use(userRouter);
router.use(roleRouter);
router.use(participantRouter);
router.use(reservationRouter);
router.use('/product', routerProduct);
router.use('/instructor', routerInstructor);
export default router;
