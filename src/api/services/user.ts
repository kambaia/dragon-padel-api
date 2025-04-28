// eslint-disable-next-line import/no-extraneous-dependencies
import { User } from '../model/User';
import { IUser, IUserRegister } from '../../interfaces/UserInterface';
import { handleMongoError } from '../../util/errors/api-error';
import { ISearch } from '../../interfaces/app/search';
export default class AuthService {
  public static async findAllUser({ limit, page }: ISearch) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await User.find({active: true})
          .limit(Number(limit))
          .skip(Number(page))
          .sort({ createdAt: -1 });
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async findOneUser(userId: string) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = (await User.findById(userId)) as IUser;
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async saveUser(user: IUserRegister) {
    console.log(user);
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
