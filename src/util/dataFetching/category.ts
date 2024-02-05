import { IProdutoCategory } from '../../interfaces/ProdutosInterface';
import { formatDate } from '../time';

export const fetchAllDataCategory = async (category: IProdutoCategory[]) => {
  let categoryResult = [];
  for (let index in category) {
    categoryResult.push({
      id: category[index]._id,
      categoryName: category[index]?.categoryName,
      active: category[index].active,
      isAvailable: category[index].isAvailable,
      updatedAt: category[index].updatedAt,
      createdAt: formatDate(category[index].createdAt),
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
