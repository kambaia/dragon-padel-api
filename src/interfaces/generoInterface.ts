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

interface Supplier {
  name: string;
  contact: string;
}

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  description?: string;
  category: string;
  price: number;
  stock: number;
  color: string;
  createdAt: Date;
  supplier?: Supplier;
}

export interface ProductQueryParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
}
export interface InstructorQueryParams {
  search?: string;
  gender?: 'Male' | 'Female' | 'Other';
  experienceLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  classType?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface IInstructor {
  _id?: string;
  fullName: string;
  profilePhoto?: string;
  personalData: {
    gender: 'Masculino' | 'Feminino' | 'Outro'
    address: string;
    email: string;
    contact: string;
  };
  professionalData: {
    experienceLevel: 'Iniciante' | 'Intermediário' | 'Avançado'
    classType: string;
  };
  financialData: {
    hourlyRate: number; // In AKZ
    paymentType: 'Fixo Mensal' | 'Por Hora' | 'Por Aula'
  };
  administrativeData: {
    studentCount: number;
    classCount: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
