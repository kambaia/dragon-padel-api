/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from '../../interfaces/UserInterface';

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum CUSTOM_VALIDATION {
  DUPLICATED = 'DUPLICATED',
}

const userSchema: Schema = new Schema(
  {
    permission: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles' },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model('User', userSchema);
