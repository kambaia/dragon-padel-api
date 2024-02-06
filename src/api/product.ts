import { Router } from 'express';
import productController from '../api/controllers/produtoctController';
import { configureStorage } from '../util/uploads/services';
import multer from 'multer';

const { storage } = configureStorage('../../../public/img/product');
const upload = multer({ storage: storage });

export const productRouter = Router();
productRouter.get('/product', productController.listAllproduct);
productRouter.get('/product/:productId', productController.listOneproduct); 
productRouter.post(
  '/product',
  upload.single('productCover'),
  productController.saveProduct
);
productRouter.put('/product/:productId', productController.updateProduct);
productRouter.delete('/product/:productId', productController.deleteProduct);
