import { ICompany } from '../../interfaces/CompanyInterface';

export const fetchAllDataAConpany = async (company: any[]) => {
  let companyResultado: ICompany[] = [];
  for (let index in company) {
    company.push({
      id: company[index]._id,
      responseDataCompany: company[index].companyName,
      activeis_active: company[index].active ? 1 : 0,
      banned: company[index].active ? 1 : 0,
      updatedAt: company[index].updatedAt,
      createdAt: company[index].createdAt,
    });
  }
  return companyResultado;
};

export const responseDataCompany = (data: any, page: number) => {
  return {
    artists: data,
    currentPage: Number(page),
    hasMorePages: true,
    lastPage: Number(page),
    perPage: data.length,
    prevPageUrl: null,
    total: data.length,
  };
};
