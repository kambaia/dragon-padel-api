import { IUser } from './UserInterface';
export interface IProdutoCategory {
  _id: string;
  categoryName: string;
  description: string;
  active: Boolean;
  isAvailable: Boolean;
}
export interface IProduct extends Document {
  _id: string;
  produtName: string;
  brand: string;
  image: string;
  model: string;
  specification: string;
  technicalDescription: string;
  description: string;
  condition: string;
  sourceOfPurchase: string;
  purchaseDate: Date;
  invoice: string;
  status: string;
  categoryId: string;
  active: boolean;
  isAvailable: string;
}

export interface IDelivery {
  _id: string;
  receivedBy: IUser['_id'];
  beneficiary: IUser['_id'];
  product: IProduct['_id'];
  deliveryDate: Date;
  deliveryQuantity: number;
  additionalAccessorie: IAdditionalAccessorie[];
  active: boolean;
  isAvailable: string;
}
export interface IAdditionalAccessorie {
  name: string;
}
