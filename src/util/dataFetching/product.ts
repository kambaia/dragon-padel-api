import { ICompany } from '../../interfaces/CompanyInterface';
import { IProduct } from '../../interfaces/ProdutosInterface';

export const fetchAllDataProduct = async (product: IProduct[]) => {
  let productResult = [];
  for (let index in product) {
    productResult.push({
      _id: product[index]._id,
      active: product[index].active ? true : false,
    });
  }
  return productResult;
};

export const responseDataProduct = (data: any, page: number) => {
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
