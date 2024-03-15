/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model, Schema } from 'mongoose';
import { IEmployee } from '../../interfaces/UserInterface';

const EmployeeSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    surname: { type: String, require: true },
    fullName: { type: String },
    gender:   { type: String },
    function:{ type: String },
    banned: { type: Boolean },
    active: { type: Boolean },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  },
  {
    timestamps: true,
  }
);
export const Employee: Model<IEmployee> =
  mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
