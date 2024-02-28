import { IUser } from '../../interfaces/UserInterface';
import { formatDate } from '../time';

export const fetchAllDataUser = async (users: IUser[]) => {
  let userArray = [];
  for (const [index, user] of users.entries()) {
    userArray.push({
      id: index + 1,
      _id: user._id,
      profile: user.profile_url,
      firstName: user.firstName,
      surname: user.surname,
      fullName: `${user.firstName} ${user?.surname}`,
      email: user.email,
      is_active: user.active,
      phoneNumber: user.phoneNumber,
      type: user.permission?.type,
      permissionId: user.permission?._id,
      departmentName: user?.department?.departmentName,
      companyName: user?.department?.company.companyName,
      departmentId: user?.department?._id,
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
