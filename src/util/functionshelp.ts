

import { IProductInStock, IStockProduct } from "../interfaces/ProdutosInterface";
export const fetchOrganizeProductData = async (product: any): Promise<IStockProduct[]> => {

    return new Promise(async function (resolve, reject) {
        const productInstock = product?.map((p:any) => {
            console.log(p)
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
        if(productInstock){
            resolve(productInstock);
        }else{
            reject([])
        }
      
    })
  
}