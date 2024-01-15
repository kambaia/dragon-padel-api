
export const fetchAllDataArtist = async (artists: any[]) =>{
  let artist = [];
  for (let index in artists) {
    artist.push({
      id: artists[index]._id,
      artistFullName: artists[index].artistFullName,
      artistName: artists[index].artistName,
      bio:artists[index].bio,
      dateOfbirth: artists[index].dateOfbirth,
      earlyCareer: artists[index].earlyCareer,
      gender:artists[index].gender,
      musicStyles:artists[index].musicStyles,
      profilePicture:artists[index].profilePicture,
      coverArtist: artists[index].coverArtist,
      activeis_active: artists[index].active ? 1 : 0,
      banned: artists[index].active ? 1 : 0,
      user: artists[index].user,
      updatedAt: artists[index].updatedAt,
      createdAt: artists[index].createdAt,
    });
  }
  return artist;
};


export const responseDataArtist = (data: any, page: number)=>{
  return {
    artists: data,
    currentPage: Number(page),
    hasMorePages: true,
    lastPage: Number(page),
    perPage: data.length,
    prevPageUrl: null,
    total: data.length,
  };
};

