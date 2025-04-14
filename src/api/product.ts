// routes/product.routes.ts
import { Router } from 'express';
import productController from './controllers/product.controller';
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

const routerProduct = Router();
routerProduct.post('/', upload.fields([
  { name: 'image', maxCount: 1 },
]), productController.createProduct);

routerProduct.put('/:id', upload.fields([
  { name: 'image', maxCount: 1 },
]), productController.updateProduct);


routerProduct.get('/', productController.getAllProducts);
routerProduct.get('/:id', productController.getProductById);
routerProduct.delete('/:id', productController.deleteProduct);

export default routerProduct;