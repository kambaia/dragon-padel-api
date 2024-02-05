/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model, Schema } from 'mongoose';
import { Permission } from '../../interfaces/UserInterface';
const Access_LevelSchema: Schema = new Schema(
  {
    level: { type: Number, required: true },
    role: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// Export the model and return your IUser interface
// Export the model and return your IUser interface
export const Role: Model<Permission> =
  mongoose.models.Roles || mongoose.model('Roles', Access_LevelSchema);
