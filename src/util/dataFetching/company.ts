import { ICompany } from '../../interfaces/CompanyInterface';
import { formatDate } from '../time';

export const fetchAllDataAConpany = async (company: ICompany[]) => {
  let companyResultado = [];
  for (const [index, cn] of company.entries()) {
    companyResultado.push({
      id: cn._id,
      logo: cn.logo_url,
      companyName: cn.companyName,
      active: cn.active,
      isAvailable: cn.isAvailable,
      createdAt: formatDate(cn.createdAt!),
    });
  }
  return companyResultado;
};

export const responseDataCompany = (data: any, page: number) => {
  return {
    companys: data,
    currentPage: Number(page),
    hasMorePages: true,
    lastPage: Number(page),
    perPage: data.length,
    prevPageUrl: null,
    total: data.length,
  };
};
