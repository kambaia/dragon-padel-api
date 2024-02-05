export const fetchAllDataRole = async (roles: any[]) => {
  let user = [];
  for (const [index, rol] of roles.entries()) {
    user.push({
      id: index + 1,
      _id: rol._id,
      level: rol.level,
      role: rol.role,
      type: rol.type,
      updatedAt: rol.updatedAt,
      createdAt: rol.createdAt,
    });
  }
  return user;
};

export const responseDataRole = (data: any, page: number) => {
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
