export interface ICompany {
  _id: string;
  thumbnail: string;
  companyName: string;
  active: boolean;
  isAvailable: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDepartment extends Document {
  _id: string;
  departmentName: string;
  active: boolean;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  company: ICompany;
}
