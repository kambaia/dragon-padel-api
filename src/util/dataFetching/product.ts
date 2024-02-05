import { ICompany } from '../../interfaces/CompanyInterface';
import { IProduct } from '../../interfaces/ProdutosInterface';

export const fetchAllDataProduct = async (product: IProduct[]) => {
  let productResult = [];
  for (const [index, pd] of product.entries()) {
    productResult.push({
      id: index + 1,
      _id: pd._id,
      image: pd.productCover,
      model: pd.model,
      brand: pd.brand,
      specification: pd.specification,
      technicalDescription: pd.technicalDescription,
      description: pd.description,
      condition: pd.condition,
      sourceOfPurchase: pd.sourceOfPurchase,
      purchaseDate: pd.purchaseDate,
      invoice: pd.invoice,
      active: pd.active,
      isAvailable: pd.isAvailable,
      registerbay: {
        userName: pd?.registerby.fullName,
        userProfile: pd?.registerby.profile,
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
