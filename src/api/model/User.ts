/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from '../../interfaces/UserInterface';

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum CUSTOM_VALIDATION {
  DUPLICATED = 'DUPLICATED',
}

const userSchema: Schema = new Schema(
  {
    profile: { type: String },
    email: { type: String, required: true, unique: true },
    name: { type: String },
    password: { type: String, required: true },
    banned: { type: Boolean,  default: false },
    active:  {
      type: Boolean,
      default: true
    },
    permission: [],
  },
  { timestamps: true });
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model('User', userSchema);
