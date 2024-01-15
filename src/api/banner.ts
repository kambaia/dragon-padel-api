
import { Router } from 'express';
import bannerController from './controllers/bannerController';

export const bannerRouter = Router();
bannerRouter.get('/banners', bannerController.listAllBanner);
bannerRouter.get('/banner/:bannerId',  bannerController.listOneBanner);
bannerRouter.post('/banner', bannerController.saveBanner);
bannerRouter.put('/banner/:bannerId', bannerController.updateBanner);
bannerRouter.delete('/banner/:bannerId', bannerController.deleteBanner);



