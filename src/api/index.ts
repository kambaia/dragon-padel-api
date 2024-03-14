import express from 'express';
import { roleRouter } from './roles';
import { userRouter } from './user';
import { sessionRouter } from './session';
import { categoryRouter } from './category';
import { companyRouter } from './company';
import { productRouter } from './product';
import { departmentRouter } from './department';
import { productInStockRouter } from './stock';
import { deliveryRouter } from './delivery';
import { RequestRouter } from './request';
const router = express.Router();

router.get('/', (req, res) => {
  return res.send(`
  <body style="display:flex;justify-content: center;  align-items: center;background-color:black;color:black;text-align:center;padding:30px; font-size:40pt;">
 <h2  style="color:#008bd0;text-align:center;padding:30px; font-size:40pt;">Seja bem-vindo a maior plataforma de conteúdo artistico angolano .</h2>
   <p style="color:#fff;text-align:center;padding:20px; font-size:20pt;">A nossa api tem como objectivo ajudar qualquer desenvolvedor no fornecimento de conteúdos de musicas e videos de todos os artistas angolanos</a></p>
 </body>
`);
});

router.use(sessionRouter);
router.use(userRouter);
router.use(roleRouter);
roleRouter.use(categoryRouter);
roleRouter.use(companyRouter);
roleRouter.use(productRouter);
roleRouter.use(departmentRouter);
roleRouter.use(productInStockRouter);
roleRouter.use(deliveryRouter);
roleRouter.use(RequestRouter);
export default router;
