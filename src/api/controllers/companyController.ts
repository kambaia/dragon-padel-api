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
        .skip(Number(page))
        .sort({ createdAt: -1 });
      const allDataCompany = await fetchAllDataAConpany(company);
      console.log(allDataCompany);
      const responseData = responseDataCompany(allDataCompany, Number(0));
      res.status(200).send(responseData);
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async listOneCompany(req: Request, res: Response): Promise<void> {
    try {
      const { companyId } = req.params;
      const company = (await Company.findById(companyId)) as ICompany;
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
      const inputs = {
        companyName: req.body.companyName,
        active: true,
        isAvailable: true,
        thumbnail: req.file?.filename,
      };
      const company = await Company.find({
        $or: [{ companyName: req.body.companyName }],
      });
      if (company.length > 0) {
        res
          .status(409)
          .json({ error: 'Esse nome de empresa já existe. Experimente outro' });
      } else {
        const data = await Company.create(inputs);

        const companydata = {
          profile: data.thumbnail,
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
      const { companyId } = req.params;
      const company = await Company.findByIdAndUpdate(
        { _id: companyId },
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
