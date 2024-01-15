/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model, Schema } from 'mongoose';
import { Idepartment } from '../../interfaces/CompanyInterface';
// eslint-disable-next-line @typescript-eslint/naming-convention

const departmentSchema: Schema = new Schema(
  {
    departmentName: {
      type: String,
      required: true,
    },
    active: Boolean,
    isAvailable: Boolean,
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  },
  { timestamps: true }
);
export const Department: Model<Idepartment> =
  mongoose.models.Department || mongoose.model('Department', departmentSchema);
