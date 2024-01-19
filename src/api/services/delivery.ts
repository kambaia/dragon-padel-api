// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import { User } from '../model/User';
import { IUser, IUserRegister } from '../../interfaces/UserInterface';
import { handleMongoError } from '../../util/errors/api-error';
import { ISearch } from '../../interfaces/app/search';
import { Delivery } from '../model/Delivery';
import { IDelivery } from '../../interfaces/ProdutosInterface';
export default class AuthService {
  public static async findAllDelivery({ limit, page }: ISearch) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await Delivery.find({})
          .limit(Number(limit))
          .skip(Number(page))
          .populate({
            path: 'user',
            populate: { path: 'department', populate: { path: 'company' } },
          });
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }

  public static async verifyDelivery(produtName: string) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = (await Delivery.findOne({
          produtName: produtName,
        })) as IDelivery;
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }

  public static async findOneDelivery(deliveryId: string) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = (await Delivery.findById(deliveryId).populate(
          'permission',
          '_id  id role type'
        )) as IUser;
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async saveDelivery(user: IUserRegister) {
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
  public static async updateDelivery(userId: string, user: IUserRegister) {
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

  public static async deleteDelivery(userId: string) {
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
