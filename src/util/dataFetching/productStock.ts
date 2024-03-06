import { ICompany } from '../../interfaces/CompanyInterface';
import { IProductInStock } from '../../interfaces/ProdutosInterface';

export const fetchAllDataProductStock = async (product: IProductInStock[]) => {
  let productResult = [];
  for (const [index, pd] of product.entries()) {
    productResult.push({
      id: pd._id,
       product: pd.product.map((prod) => {
        return {
            productId: prod.productId,
            productQuantity: prod.productQuantity
        }}),
      invoiceDocument:pd.invoiceDocument,
      documentNumber:pd.documentNumber,
      supplier:pd.supplier,
      document_url: pd.document_url,
      userName: `${pd?.registerby?.firstName} ${pd?.registerby?.surname}`,
    });
  }
  return productResult;
};

export const responseDataProductStock = (data: any, page: number) => {
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
