import { IRequest } from '../../interfaces/ProdutosInterface';
import { formatDate } from '../time';

export const fetchAllDataRequest = async (Request: IRequest[]) => {
  let RequestResult = [];
  for (const [_, ct] of Request.entries()) {
    RequestResult.push({
      id: ct._id,
      requestedBy: ct?.requestedBy,
      equipmentName: ct?.equipment.brand,
      equipmentCategory: ct?.equipment?.category?.categoryName,
      cover_url: ct?.equipment.cover_url,
      observation: ct?.observation,
      equipmentType: ct?.employee?.function,
      active: ct.active,
      visible: ct.visible,
      received:ct.received,
      processing:ct.processing,
      updatedAt: ct.updatedAt,
      createdAt: formatDate(ct.createdAt),
    });
  }
  return RequestResult;
};

export const responseDataRequest = (data: any, page: number) => {
  return {
    Requests: data,
    currentPage: Number(page),
    hasMorePages: true,
    lastPage: Number(page),
    perPage: data.length,
    prevPageUrl: null,
    total: data.length,
  };
};
