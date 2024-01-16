export interface ICompany {
  _id: string;
  thumbnail: string;
  companyName: string;
  active: boolean;
  isAvailable: string;
}

export interface IDepartment extends Document {
  _id: string;
  departmentName: string;
  active: boolean;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
  company: ICompany;
}
