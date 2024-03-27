import { IDelivery } from '../../interfaces/ProdutosInterface';

export const fetchAllDatadelivery = async (product: IDelivery[]) => {
  let productResult = [];
  for (const [_index, pd] of product.entries()) {
    productResult.push({
      id: pd._id,
      deliveredByFullName: `${pd?.deliveredBy?.firstName} ${pd.deliveredBy?.surname}`,
      receivedByFullName: `${pd?.receivedBy?.firstName} ${pd.receivedBy?.surname}`,
      beneficiaryFullName: `${pd?.beneficiary?.firstName} ${pd.beneficiary.surname}`,
      beneficiaryCompany: `${pd?.beneficiary?.department?.company.companyName}-${pd?.beneficiary?.department?.departmentName}`,
      deliveryQuantity: pd.deliveryQuantity,
      serialNumber: pd.productInStock.product?.serialNumber,
			productCover :  pd.productInStock.product?.productCover,
			model : `${pd.productInStock.product?.brand}-${pd.productInStock.product?.model}`,
			condition : pd.productInStock.product?.condition,
      technicalDescription : pd.productInStock.product?.technicalDescription,
      deliveryDate:  pd.deliveryDate?.split("-").reverse().join("-"),
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
    lastPage: Number(page + 1),
    perPage: data.length,
    prevPageUrl: null,
    total: data.length,
  };
};
