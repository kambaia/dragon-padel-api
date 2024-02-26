// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import { User } from '../model/User';
import { IUser, IUserRegister } from '../../interfaces/UserInterface';
import { handleMongoError } from '../../util/errors/api-error';
import { ISearch } from '../../interfaces/app/search';
export default class AuthService {
  public static async findAllUser({ limit, page }: ISearch) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await User.find({})
          .limit(Number(limit))
          .skip(Number(page))
          .populate('permission', '_id  id role type')
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
  public static async findOneUser(userId: string) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = (await User.findById(userId)
          .populate('permission', '_id  id role type')
          .populate({
            path: 'department',
            select: 'departmentName', // Seleciona apenas o campo 'name' do departamento
            populate: {
              path: 'company',
              select: 'thumbnail logo_url companyName', // Seleciona apenas os campos 'logo' e 'name' da empresa
            },
          })) as IUser;
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async saveUser(user: IUserRegister) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await User.create(user);
        result.password = undefined;
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async updateUser(userId: string, user: IUserRegister) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await User.findByIdAndUpdate(
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
        const result = await User.findByIdAndDelete(userId);
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
}
