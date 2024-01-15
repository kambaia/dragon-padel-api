export const fetchAllDataUser = async (users: any[]) => {
  let user = [];
  for (let index in users) {
    user.push({
      firstName: users[index].firstName,
      surname: users[index].surname,
      fullName: users[index].fullName,
      userName: users[index].userName,
      createdAt: users[index].createdAt,
      email: users[index].email,
      id: users[index]._id,
      is_active: users[index].active ? 1 : 0,
      phoneNumber: users[index].phoneNumber,
      permission: users[index].permission,
      profile: users[index].profile,
      updatedAt: users[index].updatedAt,
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
