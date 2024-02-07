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
  category: string;
  active: boolean;
  isAvailable: string;
  registerby: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDelivery {
  _id: string;
  deliveredBy: IUser['_id'];
  receivedBy: IUser['_id'];
  beneficiary: IUser['_id'];
  product: IProduct;
  deliveryDate: Date;
  deliveryQuantity: number;
  additionalAccessorie: IAdditionalAccessorie[];
  active: boolean;
  isAvailable: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IAdditionalAccessorie {
  name: string;
}
