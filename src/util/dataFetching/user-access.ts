import { IUser } from '../../interfaces/UserInterface';
import { formatDate } from '../time';

export const fetchAllDataUser = async (user: IUser) => {
  return {
    id: user._id,
    surname: user.name,
    email: user.email,
    gender: user.gender,
    banned: user.banned,
    bio: user.bio,
    active: user.active,
    createdAt: formatDate(user.createdAt),
    updatedAt: formatDate(user.updatedAt),
    profile: user.profile,
  };
};

export const responseDataUser = (data: any, page: number) => {
  return {
    users: data,
    currentPage: Number(page),
    hasMorePages: true,
    lastPage: Number(page),
    perPage: data.length,
    prevPageUrl: null,
    total: data.length,
  };
};
