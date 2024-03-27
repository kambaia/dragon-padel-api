import { IRequest } from '../../interfaces/ProdutosInterface';
import { formatDate } from '../time';

export const fetchAllDataRequest = async (request: IRequest[]) => {
  let requestResult = [];
  for (const [_, ct] of request.entries()) {
    requestResult.push({
      id: ct._id,
      requestedBy: `${ct?.requestedBy.firstName} ${ct.requestedBy.surname}`,
      requestedById: ct?.requestedBy._id,
      employeeId: ct?.employee?._id,
      employee: `${ct?.employee?.firstName} ${ct?.employee?.surname}`,
      equipmentName: `${ct?.equipment.brand} ${ct?.equipment.model}`,
      equipmentCategory: ct?.equipment?.category?.categoryName,
      cover_url: ct?.equipment.cover_url,
      observation: ct?.observation,
      productId: ct?.equipment._id,
      equipmentType: ct?.employee?.function,
      quantity: ct?.quantity,
      active: ct.active,
      visible: ct.visible,
      received:ct.received,
      processing:ct.processing,
      done: ct.done,
      updatedAt: ct.updatedAt,
      createdAt: formatDate(ct.createdAt),
    });
  } 
  return requestResult;
};

export const responseDataRequest = (data: any, page: number) => {
  return {
    requests: data,
    currentPage: Number(page),
    hasMorePages: true,
    lastPage: Number(page),
    perPage: data.length,
    prevPageUrl: null,
    total: data.length,
  };
};
