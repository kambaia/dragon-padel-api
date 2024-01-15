import { Request, Response } from 'express';
import {
  fetchAllDataAConpany,
  responseDataCompany,
} from '../../util/dataFetching/company';
import { Company } from '../model/Company';
import { ICompany } from '../../interfaces/CompanyInterface';
class CompanyController {
  public async listAllCompany(req: Request, res: Response): Promise<void> {
    const { limit = 25, page } = req.query;
    try {
      const company = await Company.find({})
        .limit(Number(limit))
        .skip(Number(page));

      const allDataUser = await fetchAllDataAConpany(company);
      const responseData = responseDataCompany(allDataUser, Number(0));
      res.status(200).send(responseData);
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async listOneCompany(req: Request, res: Response): Promise<void> {
    try {
      const { CompanyId } = req.params;
      const company = (await Company.findById(CompanyId)) as ICompany;
      if (company) {
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
      const company = await Company.find({
        $or: [{ CompanyName: req.body.CompanyName }],
      });
      if (Company.length > 0) {
        res
          .status(409)
          .json({ error: 'Esse nome de usuário já existe. Experimente outro' });
      } else {
        const data = await Company.create(req.body);

        const companydata = {
          profile: data.icon,
          CompanyName: data.companyName,
          id: data._id,
        };
        res
          .status(201)
          .json({ success: 'Cadastro feito  com sucesso', ...companydata });
      }
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }

  public async updateCompany(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const { CompanyId } = req.params;
      const company = await Company.findByIdAndUpdate(
        { _id: CompanyId },
        { $set: data },
        { new: false }
      );
      res.status(204).json({
        message: 'As suas informações foram actualizadas com sucesso',
        company,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Aconteceu um erro ao atualizada', error });
    }
  }

  public async deleteCompany(req: Request, res: Response): Promise<Response> {
    try {
      const { CompanyId } = req.params;
      const company = await Company.findByIdAndDelete(CompanyId);
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
