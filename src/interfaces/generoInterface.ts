import { Types } from 'mongoose';

export interface IParticipant extends Document {
  _id: any;
  profile: string;
  name: string;
  gender: string;
  numberOfGames:string;
  category: Types.ObjectId;
  user_id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReservation extends Document {
  _id: string;
  name: string;
  representative:string;
  pitch:string;
  description?: string;
  creator_id: any;
  creation_date?: Date;
  startTime: string;
  endTime: string;
  club?: string;
  price?: number;
  newGame?:boolean;
  field?: string;
  participants: IParticipant[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategory extends Document {
  _id: string;
  categoryName: string;
  description?: string;
}