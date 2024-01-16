import { ICompany, IDepartment } from '../../interfaces/CompanyInterface';

export const fetchAllDataDepartment = async (department: IDepartment[]) => {
  let departmentResult = [];
  for (let index in department) {
    departmentResult.push({
      _id: department[index]._id,
      IconCompany: department[index].company.thumbnail,
      companyName: department[index].company.companyName,
      departmentName: department[index].departmentName,
      active: department[index].active,
      isAvailable: department[index].isAvailable,
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
