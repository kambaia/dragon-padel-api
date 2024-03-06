import { Request, Response } from 'express';
import {
  fetchAllDataAConpany,
  responseDataCompany,
} from '../../util/dataFetching/company';
import CompanyService from '../services/company';
import { ISearch } from '../../interfaces/app/search';
import { Company } from '../model/Company';
import { ICompany } from '../../interfaces/CompanyInterface';
import { deleteFileInDataBase } from '../../util/deleteFile';
class CompanyController {
  public async listAllCompany(req: Request, res: Response): Promise<void> {
    try {
      const { limit = 25, page = 0 } = req.query as unknown as ISearch;
      const company = await CompanyService.findAllCompany({ limit, page});
      const allDataCompany = await fetchAllDataAConpany(company);
      const responseData = responseDataCompany(allDataCompany, Number(0));
      res.status(200).send(responseData);
    } catch (error) {
      res.status(404).send(error);
    }
  }
  public async listOneCompany(req: Request, res: Response): Promise<void> {
    try {
      const { companyId } = req.params;
      const allDataCompany = await CompanyService.findOneCompany(companyId);
      if (allDataCompany) {
        res.status(200).send(Company);
      } else {
        res
          .status(404)
          .send({ message: 'Não foi encontrada nenhuma Company.' });
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async saveCompany(req: Request, res: Response): Promise<void> {
    try {
      const inputs = {
        thumbnail: req.file?.filename,
        ...req.body,
      };
      const company = await Company.find({
        $or: [{ companyName: req.body.companyName }],
      });

      if (company.length > 0) {
        res
          .status(409)
          .json({ error: 'Esse nome de empresa já existe. Experimente outro' });
      } else {
          const allDataCompany = await CompanyService.saveCompany(inputs) as any;
        res
          .status(201)
          .json(allDataCompany);
      }
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }

  public async updateCompany(req: Request, res: Response): Promise<void> {
    try {
      const { companyId } = req.params;
      const user = (await CompanyService.updateCompany(companyId, req.body));
      res.status(204).json({
        message: 'As suas informações foram actualizadas com sucesso',
        user,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Aconteceu um erro ao atualizada', error });
    }
  }

  public async updateCompanyWithProfile(req: Request, res: Response): Promise<void> {
    try {

      const { companyId } = req.params;
      const inputs = {
          thumbnail: req.file?.filename,
        ...req.body,
      };

      const companyFinded = (await CompanyService.findOneCompany(companyId)) as ICompany;
      if (companyFinded) {
        const resultDelete = await deleteFileInDataBase('companys', companyFinded?.thumbnail);
        if (resultDelete) {
          const company = (await CompanyService.updateCompany(companyId, inputs)) as any;
          res.status(204).json({
            message: 'As suas informações foram actualizadas com sucesso',
            company,
          });
        }
      }else{
      res
        .status(500)
        .json({ message: 'Aconteceu um erro ao atualizada' });
      }

    } catch (error) {
      res
        .status(500)
        .json({ message: 'Aconteceu um erro ao atualizada', error });
    }
  }

  public async deleteCompany(req: Request, res: Response): Promise<Response> {
    try {
      const { companyId } = req.params;
      const company = await Company.findByIdAndDelete(companyId);
      if (company) {
        return res.status(204).send('Deletado com sucesso');
      }
      return res.status(404).send(Company);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
}

export default new CompanyController();
