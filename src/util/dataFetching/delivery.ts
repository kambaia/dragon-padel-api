import { IDelivery } from '../../interfaces/ProdutosInterface';

export const fetchAllDatadelivery = async (product: IDelivery[]) => {
  let productResult = [];
  for (const [index, pd] of product.entries()) {
    productResult.push({
      id: index + 1,
      _id: pd._id,
      deliveredBy: pd.deliveredBy,
      receivedBy: pd.receivedBy,
      beneficiary: pd.beneficiary,
      deliveryQuantity: pd.deliveryQuantity,
      deliveryDate: pd.deliveryDate,
      product: {
        productName: pd?.product.produtName,
        productCover: pd?.product.productCover,
        productId: pd.product._id,
      },
      active: pd.active,
      isAvailable: pd.isAvailable,
    });
  }
  return productResult;
};

export const responseDatadelivery = (data: any, page: number) => {
  return {
    deliverys: data,
    currentPage: Number(page),
    hasMorePages: true,
    lastPage: Number(page),
    perPage: data.length,
    prevPageUrl: null,
    total: data.length,
  };
};
