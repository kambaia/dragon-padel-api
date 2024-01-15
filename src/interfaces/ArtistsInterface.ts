export interface ISocialMidia {
  facebook: string;
  twitter: string;
  whatsapp: string;
  instagram: string;
  spotify?: string;
  appleMusic?: string;
}

export interface IArtists extends Document {
  _id: string;
  profilePicture: {
    thumbnail: string, name:string,
  };
  coverArtist:  {
    thumbnail: string, name:string,
  };

  artistFullName: string;
  artistName: string;

  bio: string;
  dateOfbirth: string;
  earlyCareer: string;
  gender: string;
  musicStyles: string;
  active: boolean;
  banned: boolean;
  user: number;
}
