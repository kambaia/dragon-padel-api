import { IUser } from '../../interfaces/UserInterface';
import { formatDate } from '../time';

export const fetchAllDataUser = async (user: IUser) => {
  return {
    _id: user._id,
    firstName: user.firstName,
    surname: user.surname,
    email: user.email,
    fullName: `${user.firstName} ${user?.surname}`,
    banned: user.banned,
    active: user.active,
    roles: user.permission?.roles,
    department: {
      departmentName: user?.department?.departmentName,
      company: user?.department?.company.companyName,
      logo_url: user?.department?.company?.logo_url,
    },
    createdAt: formatDate(user.createdAt),
    updatedAt: formatDate(user.updatedAt),
    profile_url: user.profile_url,
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
