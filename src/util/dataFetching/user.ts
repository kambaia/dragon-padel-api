import { IUser } from '../../interfaces/UserInterface';
import { formatDate } from '../time';

export const fetchAllDataUser = async (users: IUser[]) => {
  let user = [];
  for (let index in users) {
    user.push({
      id: users[index]._id,
      profile: users[index].profile,
      firstName: users[index].firstName,
      surname: users[index].surname,
      fullName: users[index].fullName,
      email: users[index].email,
      is_active: users[index].active,
      phoneNumber: users[index].phoneNumber,
      type: users[index].permission?.type,
      departmentName: users[index]?.department?.departmentName,
      companyName: users[index]?.department?.company.companyName,
      updatedAt: users[index].updatedAt,
      banned: users[index].banned,
      createdAt: formatDate(users[index].createdAt),
    });
  }
  return user;
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
