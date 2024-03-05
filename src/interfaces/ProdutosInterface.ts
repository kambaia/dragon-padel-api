import { IUser } from './UserInterface';
export interface IProdutoCategory {
  _id: string;
  categoryName: string;
  description: string;
  active: Boolean;
  isAvailable: Boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IProduct extends Document {
  _id: string;
  serialNumber: string;
  cover_url?: string;
  productName: string;
  brand: string;
  productCover: string;
  model: string;
  specification: string;
  technicalDescription: string;
  description: string;
  condition: string;
  sourceOfPurchase: string;
  purchaseDate: string;
  invoice: string;
  status: string;
  category: IProdutoCategory;
  active: boolean;
  isAvailable: string;
  registerby: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductInStock extends Document {
  _id: string;
  invoiceDocument: string;
  documentNumber: string;
  supplier: string;
  product: IProduct & { productQuantity: number }; 
  registerby:IUser
  createdAt: Date;
  updatedAt: Date;
}
export interface IDelivery {
  _id: string;
  deliveredBy: IUser;
  receivedBy: IUser;
  beneficiary: IUser;
  product:  IProductInStock & { deliveryQuantity: number }; 
  deliveryDate: Date;
  additionalAccessorie: IAdditionalAccessorie[];
  active: boolean;
  isAvailable: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IAdditionalAccessorie {
  name: string;
}
