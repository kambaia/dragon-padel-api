import { IProdutoCategory } from '../../interfaces/ProdutosInterface';
import { formatDate } from '../time';

export const fetchAllDataCategory = async (category: IProdutoCategory[]) => {
  let categoryResult = [];
  for (const [index, ct] of category.entries()) {
    categoryResult.push({
      index: index + 1,
      id: ct._id,
      categoryName: ct?.categoryName,
      description: ct?.description,
      active: ct.active,
      isAvailable: ct.isAvailable,
      updatedAt: ct.updatedAt,
      createdAt: formatDate(ct.createdAt),
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
