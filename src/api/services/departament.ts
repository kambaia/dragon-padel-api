// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import { Department } from '../model/Departament';
import { IUser, IUserRegister } from '../../interfaces/UserInterface';
import { handleMongoError } from '../../util/errors/api-error';
import { ISearch } from '../../interfaces/app/search';
import { IDepartment } from '../../interfaces/CompanyInterface';
export default class DepartamentService {
  public static async findAllDepartament({ limit, page }: ISearch) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await Department.find({active: true})
          .limit(Number(limit))
          .skip(Number(page))
          .populate('company', '_id  companyName');
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async findOneUser(departmentId: string) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = (await Department.findById(departmentId).populate(
          'permission',
          '_id  id role type'
        )) as IUser;
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async saveUser(department: IDepartment) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await Department.create(department);
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async updateUser(userId: string, user: IUserRegister) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await Department.findByIdAndUpdate(
          { _id: userId },
          { $set: user },
          { new: false }
        );
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }

  public static async deleteUser(userId: string) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await Department.findByIdAndDelete(userId);
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
}
