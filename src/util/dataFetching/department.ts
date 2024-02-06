import { ICompany, IDepartment } from '../../interfaces/CompanyInterface';
import { formatDate } from '../time';

export const fetchAllDataDepartment = async (department: IDepartment[]) => {
  let departmentResult = [];
  for (const [index, dp] of department.entries()) {
    departmentResult.push({
      id: index + 1,
      _id: dp._id,
      IconCompany: dp.company.thumbnail,
      companyName: dp.company.companyName,
      departmentName: dp.departmentName,
      active: dp.active,
      isAvailable: dp.isAvailable,
      createdAt: formatDate(dp.createdAt),
    });
  }
  return departmentResult;
};

export const responseDataDepartment = (data: any, page: number) => {
  return {
    departments: data,
    currentPage: Number(page),
    hasMorePages: true,
    lastPage: Number(page),
    perPage: data.length,
    prevPageUrl: null,
    total: data.length,
  };
};
