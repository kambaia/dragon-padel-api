import { Router } from 'express';
import companyController from './controllers/companyController';
import multer from 'multer';
import { configureStorage } from '../util/uploads/services';
const { storage } = configureStorage('../../../public/img/companys');
const upload = multer({ storage: storage });

export const companyRouter = Router();
companyRouter.get('/company', companyController.listAllCompany);
companyRouter.get('/company/:companyId', companyController.listOneCompany);
companyRouter.post(
  '/company',
  upload.single('thumbnail'),
  companyController.saveCompany
);
companyRouter.put('/company/:companyId', companyController.updateCompany);
companyRouter.put("/company-with-file/:companyId", upload.single('thumbnail'), companyController.updateCompanyWithProfile);
companyRouter.delete('/company/:companyId', companyController.deleteCompany);
