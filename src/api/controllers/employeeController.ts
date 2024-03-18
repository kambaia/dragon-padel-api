import { Request, Response } from 'express';
import AuthService from '../services/auth';

import EmployeeService from '../services/employee';
import { ISearch } from '../../interfaces/app/search';
import { fetchAllDataEmployee, responseDataEmployee } from '../../util/dataFetching/employee';

class EmployeeController {
  public async listAllEmployee(req: Request, res: Response): Promise<void> {
    const { limit = 25, page = 0 } = req.query as unknown as ISearch;
    try {
      const employee = (await EmployeeService.findAllEmployee({ limit, page })) as any;
    const allDataEmp = await fetchAllDataEmployee(employee);
      const responseData = responseDataEmployee(allDataEmp, Number(0));
      res.status(200).send(responseData);
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async listOneEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { employeeId } = req.params;
      if (employeeId) {
        const Employee = (await EmployeeService.findOneEmployee(employeeId)) as any;
        if (Employee) {
          res.status(200).send(Employee);
        } else {
          res
            .status(404)
            .send({ message: 'Não foi encontrada nenhuma funcionário.' });
        }
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async saveEmployee(req: Request, res: Response): Promise<void> {
    console.log(req.body)
    try {
      const Employee = (await AuthService.authLogin(req.body.email)) as any;
      if (Employee) {
        res
          .status(409)
          .json({ error: 'Esse nome de usuário já existe. Experimente outro' });
      } else {
        const inputs = req.body;
        const data = (await EmployeeService.saveEmployee(inputs)) as any;
        const Employeedata = {
          fullName: data.fullName,
          id: data._id,
        };
        res
          .status(201)
          .json({ success: 'Cadastro feito  com sucesso', ...Employeedata });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error });
    }
  }

  public async updateEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { employeeId } = req.params;
      const employee = (await EmployeeService.updateEmployee(employeeId, req.body)) as any;
      res.status(204).json({
        message: 'As suas informações foram actualizadas com sucesso',
        employee,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Aconteceu um erro ao atualizada', error });
    }
  }

  public async deleteEmployee(req: Request, res: Response): Promise<Response> {
    try {
      const { employeeId } = req.params;
          const employee = (await EmployeeService.deleteEmployee(employeeId)) as any;
          return res.status(204).json({
            message: 'As suas informações foram deleter com sucesso',
            employee,
          });
      }
      catch (error) {
      return res.status(404).send(error);
    }
  }
}

export default new EmployeeController();
