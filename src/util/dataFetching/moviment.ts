import { IDelivery, Imovements } from '../../interfaces/ProdutosInterface';

export const fetchAllDataMovimet = async (moviments: Imovements[]) => {
  let productResult = [];
  for (const [_index, pd] of moviments.entries()) {
    productResult.push({
      id: pd._id,
      deliveredByFullName: `${pd?.delivery?.deliveredBy.firstName} ${pd.delivery?.deliveredBy?.surname}`,
      receivedByFullName: `${pd?.delivery?.receivedBy?.firstName} ${pd?.delivery?.receivedBy?.surname}`,
      beneficiaryFullName: `${pd?.delivery?.beneficiary?.firstName} ${pd.delivery?.beneficiary.surname}`,
      beneficiaryCompany: `${pd?.delivery?.beneficiary?.department?.company.companyName}-${pd?.delivery?.beneficiary?.department?.departmentName}`,
      productQuantity: pd.productQuantity,
      serialNumber: pd.productInStock.product?.serialNumber,
			productCover :  pd.productInStock.product?.productCover,
			model : `${pd.productInStock.product?.brand}-${pd.productInStock.product?.model}`,
			condition : pd.productInStock.product?.condition,
      technicalDescription : pd.productInStock.product?.technicalDescription,
      supplier : pd.productInStock.supplier,
      deliveryDate:  pd.movementDay,
      entry: pd?.entry,
      movementTime: pd?.movementTime,
      productOutput: pd?.productOutput,
      createdAt: pd?.createdAt,
      updatedAt: pd?.updatedAt,
    });
  }
  return productResult;
};

export const responseDataMovimet = (data: any, page: number) => {
  return {
    moviments: data,
    currentPage: Number(page),
    hasMorePages: true,
    lastPage: Number(page + 1),
    perPage: data.length,
    prevPageUrl: null,
    total: data.length,
  };
};
