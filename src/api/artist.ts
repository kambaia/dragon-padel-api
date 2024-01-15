import { Router } from 'express';
import companyController from './controllers/companyController';

export const companyRouter = Router();
companyRouter.get('/company', companyController.listAllCompany);
companyRouter.get('/company/:companyId', companyController.listOneCompany);
companyRouter.post('/company', companyController.saveCompany);
companyRouter.put('/company/:companyId', companyController.updateCompany);
companyRouter.delete('/company/:companyId', companyController.deleteCompany);
