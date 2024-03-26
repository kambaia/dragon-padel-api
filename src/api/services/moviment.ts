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
                        path: 'delivery',
                        select: '-_id',
                        populate: {
                            path: 'beneficiary',
                            select: '-_id firstName surname', // Seleciona apenas o campo 'name' do departamento
                            populate: {
                                path: 'department',
                                select: '-_id departmentName', // Seleciona apenas o campo 'name' do departamento
                                populate: {
                                    path: 'company',
                                    select: '-_id thumbnail logo_url companyName', // Seleciona apenas os campos 'logo' e 'name' da empresa
                                },
                            },
                        }
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