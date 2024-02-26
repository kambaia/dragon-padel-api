import { IDelivery } from '../../interfaces/ProdutosInterface';

export const fetchAllDatadelivery = async (product: IDelivery[]) => {
  let productResult = [];
  for (const [index, pd] of product.entries()) {
    productResult.push({
      id: index + 1,
      _id: pd._id,
      deliveredBy: {
        fullName: `${pd.deliveredBy?.firstName} ${pd.deliveredBy?.surname}`,
        department: {
          departmentName: pd.deliveredBy?.department.departmentName,
          company: pd.deliveredBy?.department.company.companyName,
          logo_url: pd.deliveredBy?.department.company.logo_url,
        },
      },
      receivedBy: {
        fullName: `${pd.receivedBy?.firstName} ${pd.receivedBy?.surname}`,
        department: {
          departmentName: pd.receivedBy?.department.departmentName,
          company: pd.receivedBy?.department.company.companyName,
          logo_url: pd.receivedBy?.department.company.logo_url,
        },
      },
      beneficiary: {
        fullName: `${pd.beneficiary?.firstName} ${pd.beneficiary.surname}`,
        department: {
          departmentName: pd.beneficiary?.department.departmentName,
          company: pd.beneficiary?.department.company.companyName,
          logo_url: pd.beneficiary?.department.company.logo_url,
        },
      },
      deliveryQuantity: pd.deliveryQuantity,
      deliveryDate: pd.deliveryDate,
      product: {
        id: pd._id,
        serialNumber: pd.product?.serialNumber,
        model: pd.product?.model,
        brand: pd.product?.brand,
        category: pd.product?.category.categoryName,
        cover_url: pd.product?.cover_url,
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
    lastPage: Number(page + 1),
    perPage: data.length,
    prevPageUrl: null,
    total: data.length,
  };
};
