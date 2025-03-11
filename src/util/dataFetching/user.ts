import { IUser } from '../../interfaces/UserInterface';
import { formatDate } from '../time';

export const fetchAllDataUser = async (users: IUser[]) => {
  console.log(users)
  let userArray = [];
  for (const [index, user] of users.entries()) {
    userArray.push({
      id: user._id,
      profile: user.profile,
      name: user.name,
      email: user.email,
      active: user.active,
      phoneNumber: user?.phoneNumber,
      updatedAt: user.updatedAt,
      banned: user.banned,
      createdAt: formatDate(user.createdAt),
    });
  }
  return userArray;
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
