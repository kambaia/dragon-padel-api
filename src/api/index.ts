import express from 'express';
import { roleRouter } from './roles';
import { userRouter } from './user';
import { sessionRouter } from './session';
import { categoryRouter } from './category';
import { participantRouter } from './participant';
import { reservationRouter } from './reservation';
const router = express.Router();

router.get('/', (req, res) => {
  return res.send({
    message: "Seja bem vido"
  });
});

router.use(sessionRouter);
router.use(userRouter);
router.use(roleRouter);
roleRouter.use(categoryRouter);
roleRouter.use(participantRouter);
roleRouter.use(reservationRouter);
export default router;
