import { ICompany } from '../../interfaces/CompanyInterface';

export const fetchAllDataAConpany = async (company: ICompany[]) => {
  let companyResultado: ICompany[] = [];
  for (let index in company) {
    companyResultado.push({
      _id: company[index]._id,
      thumbnail: company[index].thumbnail,
      companyName: company[index].companyName,
      active: company[index].active,
      isAvailable: company[index].isAvailable,
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
