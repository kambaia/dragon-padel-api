// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import { Request } from '../model/Request';
import { handleMongoError } from '../../util/errors/api-error';
import { ISearch } from '../../interfaces/app/search';
import { IRequest } from '../../interfaces/ProdutosInterface';

export default class RequestService {
  public static async findAllRequest({ limit, page }: ISearch) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await Request.find({})
          .limit(Number(limit))
          .skip(Number(page))
          .populate('requestedBy', 'profile firstName surname')
          .populate('employee', 'firstName surname')
          .populate({
            path: 'equipment',
            select: 'serialNumber productCover cover_url model brand condition technicalDescription',
            populate: {
              path: 'category',
              select: '-_id categoryName', // Seleciona apenas o campo 'name' do departamento
            },
          });
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async findOneRequest(requestId: string) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = (await Request.findById(requestId)) as IRequest;
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async saveRequest(request: IRequest) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await Request.create(request);
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async updateRequest(requestId: string, request: IRequest) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await Request.findByIdAndUpdate(
          { _id: requestId },
          { $set: Request },
          { new: false }
        );
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }

  public static async deleteRequest(requestId: string) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await Request.findByIdAndDelete(requestId);
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
}
