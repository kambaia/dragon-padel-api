import { IDepartment } from './CompanyInterface';

export interface IUser extends Document {
  [x: string]: any;
  _id: string;
  profile: {
    thumbnail: string;
    name: string;
  };
  firstName: string;
  surName: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  password?: string;
  banned: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  permission: Permission;
  department: IDepartment;
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
