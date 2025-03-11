
import { ICategory } from '../../interfaces/generoInterface';
import { formatDate } from '../time';

export const fetchAllDataCategory = async (category: ICategory[]) => {
  let categoryResult = [];
  for (const [index, ct] of category.entries()) {
    categoryResult.push({
      id: ct._id,
      categoryName: ct?.categoryName,
      description: ct?.description,
    });
  }
  return categoryResult;
};

export const responseDataCategory = (data: any, page: number) => {
  return {
    categorys: data,
    currentPage: Number(page),
    hasMorePages: true,
    lastPage: Number(page),
    perPage: data.length,
    prevPageUrl: null,
    total: data.length,
  };
};
