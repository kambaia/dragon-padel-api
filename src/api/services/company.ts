// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import { Company } from '../model/Company';
import { ICompany  } from '../../interfaces/CompanyInterface';
import { handleMongoError } from '../../util/errors/api-error';
import { ISearch } from '../../interfaces/app/search';
export default class CompanyService {
  public static async findAllCompany({ limit, page }: ISearch) {
    return new Promise(async function (resolve, reject) {
      try {
        const company = await Company.find({})
        .limit(Number(limit))
        .skip(Number(page))
        .sort({ createdAt: -1 });
        resolve(company);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async findOneCompany(companyId: string) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = (await Company.findById(companyId)) as ICompany;
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async saveCompany(company: ICompany) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await Company.create(company);
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async updateCompany(companyId: string, company: ICompany) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await Company.findByIdAndUpdate(
          { _id: companyId },
          { $set: company },
          { new: false }
        );
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }

  public static async deleteCompany(companyId: string) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await Company.findByIdAndDelete(companyId);
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
}
