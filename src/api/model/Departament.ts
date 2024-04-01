/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model, Schema } from 'mongoose';
import { IDepartment } from '../../interfaces/CompanyInterface';
// eslint-disable-next-line @typescript-eslint/naming-convention

const departmentSchema: Schema = new Schema(
  {
    departmentName: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true
    },
    isAvailable:{
      type: Boolean,
      default: true
    },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  },
  { timestamps: true }
);
export const Department: Model<IDepartment> =
  mongoose.models.Department || mongoose.model('Department', departmentSchema);
