export interface IUser extends Document {
  [x: string]: any;
  _id: string;
  profile: {
    thumbnail: string;
    name: string;
  };
  
  firstName: string;
  surname: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  password?: string;
  banned: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  permission: Permission;
}

export interface IUserRegister {
  active: boolean;
  banned: boolean;
  email: string;
  firstName: string;
  fullName: string;
  password: string;
  profileName: string;
  surname: string;
  urlProfile: string;
  userBirth: string;
  userName: string;
  status: boolean;
}
export interface IEmployee {
  _id:string;
  active: boolean;
  banned: boolean;
  firstName: string;
  fullName: string;
  function:string;
  phoneNumber:string;
  gender:string;
  surname: string;
  status: boolean;
  user?:IUser;
  createdAt: Date;
  updatedAt: Date;
  address?: Address
}

export interface Address {
  street: string;
  city: string;
  country: string;
  province: string;
  county: string;
  neighborhood: string;
}
export interface Contact {
  unitel: string;
  movicel: string;
  fixe: string;
}

export interface Permission extends Document {
  _id: string;
  level: number;
  roles: [string];
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
