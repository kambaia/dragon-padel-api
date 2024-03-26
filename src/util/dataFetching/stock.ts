import { ICompany } from '../../interfaces/CompanyInterface';
import { IProductEntry, IStock, IStockProduct } from '../../interfaces/ProdutosInterface';
import { fetchOrganizeProductData } from '../functionshelp';

export const fetchAllDataStock = async (productInstok: any) => {
  let productResult = [];
  for (const [index, pd] of productInstok.entries()) {
    productResult.push({
      id: pd._id,
      serialNumber: pd.product.serialNumber,
			productCover :  pd.product.productCover,
			model : pd.product.model,
			brand : pd.product.brand,
			condition : pd.product.condition,
			active : true,
			isAvailable : true,
			technicalDescription : pd.product.technicalDescription,
			cover_url : pd.product.cover_url,
			productId : pd.product.id,
      quantity : pd.productQuantity,
    });
  }
  return productResult;
};

export const responseDataStock = (data: any, page: number) => {
  return {
    products: data,
    currentPage: Number(page),
    hasMorePages: true,
    lastPage: Number(page),
    perPage: data.length,
    prevPageUrl: null,
    total: data.length,
  };
};
