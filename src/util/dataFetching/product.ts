import { ICompany } from '../../interfaces/CompanyInterface';
import { IProduct } from '../../interfaces/ProdutosInterface';

export const fetchAllDataProduct = async (product: IProduct[]) => {
  let productResult = [];
  for (let index in product) {
    productResult.push({
      _id: product[index]._id,
      image: product[index].productCover,
      model: product[index].model,
      brand: product[index].brand,
      specification: product[index].specification,
      technicalDescription: product[index].technicalDescription,
      description: product[index].description,
      condition: product[index].condition,
      sourceOfPurchase: product[index].sourceOfPurchase,
      purchaseDate: product[index].purchaseDate,
      invoice: product[index].invoice,
      active: product[index].active,
      isAvailable: product[index].isAvailable,
      registerbay: {
        userName: product[index]?.registerby.fullName,
        userProfile: product[index]?.registerby.profile,
      },
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
