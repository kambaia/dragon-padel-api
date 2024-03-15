import { IRequest } from '../../interfaces/ProdutosInterface';
import { formatDate } from '../time';

export const fetchAllDataRequest = async (Request: IRequest[]) => {
  let RequestResult = [];
  for (const [index, ct] of Request.entries()) {
    RequestResult.push({
      id: ct._id,
      requestedBy: ct?.requestedBy,
      description: ct?.equipment,
      equipmentType: ct?.employee.function,
      active: ct.active,
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
