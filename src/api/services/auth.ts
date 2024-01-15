// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import { User } from '../model/User';
import { IUser } from '../../interfaces/UserInterface';
import mongoose, { Error, MongooseError } from 'mongoose';
import { handleMongoError } from '../../util/errors/api-error';
export default class AuthService {
  public static async hashPassword(
    password: string,
    salt = 10
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  public static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  public static async authLogin(email: string) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = (await User.findOne({ email })
          .select('+password')
          .populate('permission', 'level type role')) as any;
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      } finally {
        // Fechar a conexão ao banco de dado
      }
    });
  }
}
