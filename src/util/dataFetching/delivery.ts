import { IDelivery } from '../../interfaces/ProdutosInterface';

export const fetchAllDatadelivery = async (product: IDelivery[]) => {
  let productResult = [];
  for (let index in product) {
    productResult.push({
      _id: product[index]._id,
      deliveredBy: product[index].deliveredBy,
      receivedBy: product[index].receivedBy,
      beneficiary: product[index].beneficiary,
      deliveryQuantity: product[index].deliveryQuantity,
      deliveryDate: product[index].deliveryDate,
      product: {
        productName: product[index]?.product.produtName,
        productCover: product[index]?.product.productCover,
        productId: product[index].product._id,
      },
      active: product[index].active,
      isAvailable: product[index].isAvailable,
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
