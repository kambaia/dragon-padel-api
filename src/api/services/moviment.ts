import { ISearch } from "../../interfaces/app/search";
import { Imovements, ImovementsRegister } from "../../interfaces/ProdutosInterface";
import { handleMongoError } from "../../util/errors/api-error";
import { Movement } from "../model/Movements";

export default class DeliveryService {


    public static async findAllMoviment({ limit, page }: ISearch) {
        return new Promise(async function (resolve, reject) {
            try {
                const result = await Movement.find({})
                    .limit(Number(limit))
                    .skip(Number(page))
                    .populate({
                        path: 'productInStock',
                        select: 'supplier',
                        populate: {
                          path: 'product',
                          select: 'serialNumber productCover cover_url model brand condition technicalDescription',
                        }
                        })
                    .populate([
                        {
                            path: 'delivery',
                            select: '-_id',
                            populate: [
                                {
                                    path: 'beneficiary',
                                    select: '-_id firstName surname',
                                    populate: {
                                        path: 'department',
                                        select: '-_id departmentName', // Seleciona apenas o campo 'name' do departamento
                                        populate: {
                                          path: 'company',
                                          select: '-_id companyName', // Seleciona apenas os campos 'logo' e 'name' da empresa
                                        },
                                      },
                                },
                                {
                                    path: 'deliveredBy',
                                    select: '-_id firstName surname',
                                },
                                {
                                    path: 'receivedBy',
                                    select: '-_id firstName surname',
                                }
                            ]
                        },
                    ])
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
                        path: 'delivery',
                        select: '-_id',
                        populate: {
                            path: 'beneficiary',
                            select: '-_id firstName surname', // Seleciona apenas o campo 'name' do departamento
                        },
                    })
                    .sort({ createdAt: -1 });


                resolve(result);
            } catch (error: unknown) {
                reject(handleMongoError(error));
            }
        });
    }

    public static async saveMoviment(moviment: ImovementsRegister) {
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