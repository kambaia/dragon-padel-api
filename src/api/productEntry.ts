import { Router } from 'express';
import ProductEntryController from './controllers/ProductEntryController';
import { configureStorage } from '../util/uploads/services';
import multer from 'multer';

const { storage } = configureStorage('../../../public/documents/stock');
const upload = multer({ storage: storage });

export const productEntryRouter = Router();
productEntryRouter.get('/productentry', ProductEntryController.listAllProductEntry);
productEntryRouter.get('/productentry/:productId', ProductEntryController.listOneProductEntry); 
productEntryRouter.post(
  '/productentry',
  upload.single('invoiceDocument'),
  ProductEntryController.saveProductEntry
);

productEntryRouter.put('/productentry/:productId', ProductEntryController.updateProductEntry);

productEntryRouter.put("/productentry-with-file/:productId", upload.single('invoiceDocument'), ProductEntryController.updateProductEntryWithProfile);

productEntryRouter.delete('/productentry/:productId', ProductEntryController.deleteProductEntry);
