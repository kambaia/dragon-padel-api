import { ICompany } from '../../interfaces/CompanyInterface';
import { IProduct } from '../../interfaces/ProdutosInterface';

export const fetchAllDataProduct = async (product: IProduct[]) => {
  let productResult = [];
  for (const [index, pd] of product.entries()) {
    productResult.push({
      id: index + 1,
      _id: pd._id,
      productName: pd.category.categoryName,
      categoryId: pd.category._id,
      image: pd.cover_url,
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
      serialNumber: pd.serialNumber,
      userName: `${pd?.registerby?.firstName} ${pd?.registerby?.surname}`,
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
