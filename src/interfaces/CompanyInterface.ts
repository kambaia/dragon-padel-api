export interface IEvents extends Document {
  _id: string;
  icon: {
    thumbnail: string;
    name: string;
  };
  companyName: string;
  active: boolean;
  isAvailable: string;
}

export interface Idepartment extends Document {
  _id: string;
  departmentName: string;
  active: boolean;
  isAvailable: boolean;
}
