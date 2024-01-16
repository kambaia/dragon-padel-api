import { Request, Response } from 'express';
import {
  responseDataDepartment,
  fetchAllDataDepartment,
} from '../../util/dataFetching/department';
import { Department } from '../model/Departament';
import { IDepartment } from '../../interfaces/CompanyInterface';
class DepartmentController {
  public async listAllDepartament(req: Request, res: Response): Promise<void> {
    const { limit = 25, page } = req.query;
    try {
      const department = await Department.find({})
        .populate('company', '_id companyName thumbnail')
        .limit(Number(limit))
        .skip(Number(page));
      console.log(department);
      const allDataDepartament = await fetchAllDataDepartment(department);
      const responseData = responseDataDepartment(
        allDataDepartament,
        Number(0)
      );
      res.status(200).send(responseData);
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async listOneDepartment(req: Request, res: Response): Promise<void> {
    try {
      const { DepartamentId } = req.params;
      const Departament = (await Department.findById(
        DepartamentId
      )) as IDepartment;
      if (Departament) {
        res.status(200).send(Departament);
      } else {
        res
          .status(404)
          .send({ message: 'Não foi encontrada nenhuma Departament.' });
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async saveDepartment(req: Request, res: Response): Promise<void> {
    try {
      const inputs = {
        departmentName: req.body.departmentName,
        active: true,
        isAvailable: true,
        company: req.body.company,
      };
      const department = await Department.find({
        $or: [{ departmentName: req.body.departmentName }],
      });
      if (department.length > 0) {
        res.status(409).json({
          error: 'Esse nome de IDepartment já existe. Experimente outro',
        });
      } else {
        const data = await Department.create(inputs);
        const Departamentdata = {
          DepartamentName: data.departmentName,
          id: data._id,
        };
        res
          .status(201)
          .json({ success: 'Cadastro feito  com sucesso', ...Departamentdata });
      }
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }

  public async updateDepartament(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const { departmentId } = req.params;
      const department = await Department.findByIdAndUpdate(
        { _id: departmentId },
        { $set: data },
        { new: false }
      );
      res.status(204).json({
        message: 'As suas informações foram actualizadas com sucesso',
        department,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Aconteceu um erro ao atualizada', error });
    }
  }

  public async deleteDepartment(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { departmentId } = req.params;
      const department = await Department.findByIdAndDelete(departmentId);
      if (department) {
        return res.status(204).send('Deletado com sucesso');
      }
      return res.status(404).send(department);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
}

export default new DepartmentController();
