import express from 'express';
import { roleRouter } from './roles';
import { userRouter } from './user';
import { sessionRouter } from './session';
import { categoryRouter } from './category';
import { companyRouter } from './company';
import { productRouter } from './product';
import { departmentRouter } from './department';
import { productEntryRouter } from './productEntry';
import { deliveryRouter } from './delivery';
import { RequestRouter } from './request';
import { stockRouter } from './stock';
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
roleRouter.use(companyRouter);
roleRouter.use(productRouter);
roleRouter.use(departmentRouter);
roleRouter.use(productEntryRouter);
roleRouter.use(stockRouter);
roleRouter.use(deliveryRouter);
roleRouter.use(RequestRouter);
export default router;
