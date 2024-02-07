/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from '../../interfaces/UserInterface';

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum CUSTOM_VALIDATION {
  DUPLICATED = 'DUPLICATED',
}

const userSchema: Schema = new Schema(
  {
    profile: {
      thumbnail: { type: String },
      name: { type: String },
    },
    firstName: { type: String, required: true },
    surname: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String },
    password: { type: String, required: true },
    banned: { type: Boolean },
    active: { type: Boolean },
    permission: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles' },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
userSchema.virtual('profile_url').get(function () {
  return `http://localhost:5000/files/user/${this.profile?.thumbnail}`;
});

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model('User', userSchema);
