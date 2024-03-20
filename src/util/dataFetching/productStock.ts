import { ICompany } from '../../interfaces/CompanyInterface';
import { IProductInStock, IStockProduct } from '../../interfaces/ProdutosInterface';
import { fetchOrganizeProductData } from '../functionshelp';

export const fetchAllDataProductStock = async (productInstok: IProductInStock[]) => {
  let productResult = [];
  for (const [index, pd] of productInstok.entries()) {
    productResult.push({
      id: pd._id,
      invoiceDocument:pd.invoiceDocument,
      documentNumber:pd.documentNumber,
      supplier:pd.supplier,
      document_url: pd.document_url,
      product: await fetchOrganizeProductData(pd.product),
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
