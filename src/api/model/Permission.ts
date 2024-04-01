/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model, Schema } from 'mongoose';
import { Permission } from '../../interfaces/UserInterface';
const Access_LevelSchema: Schema = new Schema(
  {
    level: { type: Number, required: true },
    roles: [String],
    type: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true
    },
  },
  { timestamps: true }
);
// Export the model and return your IUser interface
// Export the model and return your IUser interface
export const Role: Model<Permission> =
  mongoose.models.Roles || mongoose.model('Roles', Access_LevelSchema);
