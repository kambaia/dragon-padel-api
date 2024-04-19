import moment from 'moment';

import { IStockProduct } from "../interfaces/ProdutosInterface";
export const fetchOrganizeProductData = async (product: any): Promise<IStockProduct[]> => {

    return new Promise(async function (resolve, reject) {
        const productInstock = product?.map((p: any) => {
            return {
                id: p?.productId._id,
                serialNumber: p?.productId.serialNumber,
                cover_url: p?.productId.cover_url,
                model: p?.productId.model,
                brand: p.productId.brand,
                specification: p?.productId.specification,
                technicalDescription: p.productId.technicalDescription,
                condition: p.productId.condition,
                active: p.productId.active,
                isAvailable: p.productId.isAvailable,
                productQuantity: p.productQuantity,
                category: p?.productId.category.categoryName
            };
        });
        if (productInstock) {
            resolve(productInstock);
        } else {
            reject([])
        }

    })

}


export const getDataFormat = () => {
    const currentDate = moment();
    const day = currentDate.date();
    const month = currentDate.month() + 1; // Adiciona 1 porque os meses são indexados de 0 a 11
    const year = currentDate.year();
    const formattedMonth = String(month).padStart(2, '0');
    const movementDay = `${day}/${formattedMonth}/${year}`;
   return movementDay; // Saída: dia/mês/ano (por exemplo, 22/03/2024)
}
export const getTimeFormat = () => {
    const currentDate = moment();
   return currentDate.format('HH:mm:ss');
}
export function extrairId(str:any) {
    // Verifica se a string contém o padrão comum de um ObjectId
    const match = str.match(/ObjectId\("(\w+)"\)/);
    // Se encontrar, retorna o ID, senão retorna a string original
    return match ? match[1] : str;
}
