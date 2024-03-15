// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import { Employee } from '../model/Employee';
import { handleMongoError } from '../../util/errors/api-error';
import { ISearch } from '../../interfaces/app/search';
import { IEmployee } from '../../interfaces/UserInterface';
export default class EmployeeService {
  public static async findAllEmployee({ limit, page }: ISearch) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await Employee.find({})
          .limit(Number(limit))
          .skip(Number(page))
          .populate({
            path: 'department',
            populate: { path: 'company' },
          })
          .sort({ createdAt: -1 });
        console.log(result);
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async findOneEmployee(employeeId: string) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await Employee.findById(employeeId)
          .populate('user', 'profile firstName surname')
          .populate({
            path: 'user',
            select: 'profile firstName surname', // Seleciona apenas o campo 'name' do departamento
            populate: {
              path: 'permission',
              select: 'role type', // Seleciona apenas os campos 'logo' e 'name' da empresa
            },
          })
          .populate({
            path: 'department',
            select: 'departmentName', // Seleciona apenas o campo 'name' do departamento
            populate: {
              path: 'company',
              select: 'thumbnail logo_url companyName', // Seleciona apenas os campos 'logo' e 'name' da empresa
            },
          }) as IEmployee;

        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    })
  }
  public static async saveEmployee(employee: IEmployee) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await Employee.create(employee);
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async updateEmployee(employeeId: string, employee: IEmployee) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await Employee.findByIdAndUpdate(
          { _id: employeeId },
          { $set: Employee },
          { new: false }
        );
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }

  public static async deleteEmployee(EmployeeId: string) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await Employee.findByIdAndDelete(EmployeeId);
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
}
