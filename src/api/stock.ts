import { Router } from 'express';
import stockController from '../api/controllers/stockController';
import { configureStorage } from '../util/uploads/services';
import multer from 'multer';

const { storage } = configureStorage('../../../public/img/stock');
const upload = multer({ storage: storage });

export const productInStockRouter = Router();
productInStockRouter.get('/stock', stockController.listAllProductInStock);
productInStockRouter.get('/stock/:productId', stockController.listOneProductInStock); 
productInStockRouter.post(
  '/stock',
  upload.single('invoiceDocument'),
  stockController.saveProductInStock
);

productInStockRouter.put('/stock/:productId', stockController.updateProductInStock);

productInStockRouter.put("/stock-with-file/:productId", upload.single('invoiceDocument'), stockController.updateProductInStockWithProfile);

productInStockRouter.delete('/stock/:productId', stockController.deleteProductInStock);
