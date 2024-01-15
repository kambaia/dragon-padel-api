
export const fetchAllDataRole = async (roles: any[]) =>{
  let user = [];
  for (let index in roles) {
    user.push({
      id: roles[index]._id,
      level: roles[index].level,
      role: roles[index].role,
      type: roles[index].type,
      updatedAt: roles[index].updatedAt,
      createdAt: roles[index].createdAt,
    });
  }
  return user;
};


export const responseDataRole = (data: any, page: number)=>{
  return {
    roles: data,
    currentPage: Number(page),
    hasMorePages: true,
    lastPage: Number(page),
    perPage: data.length,
    prevPageUrl: null,
    total: data.length,
  };
};

