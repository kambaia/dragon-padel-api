import { ISearch } from "../../interfaces/app/search";
import { Imovements } from "../../interfaces/ProdutosInterface";
import { handleMongoError } from "../../util/errors/api-error";
import { Movement } from "../model/Movements";

export default class DeliveryService {


    public static async findAllMoviment({ limit, page }: ISearch) {
        return new Promise(async function (resolve, reject) {
            try {
                const result = await Movement.find({})
                    .limit(Number(limit))
                    .skip(Number(page))
                    .populate('product', 'serialNumber productCover cover_url model brand condition technicalDescription active technicalDescription isAvailable')
                    .populate({
                        path: 'deliveredBy',
                        select: 'firstName surname',
                    })
                    .populate({
                        path: 'productInStock',
                    })
                    .sort({ createdAt: -1 });


                resolve(result);
            } catch (error: unknown) {
                reject(handleMongoError(error));
            }
        });
    }
    public static async findOneMoviment(movimentId: string) {
        return new Promise(async function (resolve, reject) {
            try {
                const result = await Movement.findById(movimentId)
                    .populate('product', 'serialNumber productCover cover_url model brand condition technicalDescription active technicalDescription isAvailable')
                    .populate({
                        path: 'deliveredBy',
                        select: 'firstName surname',
                    })
                    .populate({
                        path: 'productInStock',
                    })
                    .sort({ createdAt: -1 });


                resolve(result);
            } catch (error: unknown) {
                reject(handleMongoError(error));
            }
        });
    }
    
  public static async saveMoviment(moviment: Imovements) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await Movement.create(moviment);
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
}