/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model, Schema } from 'mongoose';
import { ICompany } from '../../interfaces/CompanyInterface';
// eslint-disable-next-line @typescript-eslint/naming-convention

const companySchema: Schema = new Schema(
  {
    thumbnail: String,
    companyName: {
      type: String,
      required: true,
    },
    active: Boolean,
    isAvailable: Boolean,
  },
  { timestamps: true }
);

// Export the model and return your IUser interface
export const Company: Model<ICompany> =
  mongoose.models.Company || mongoose.model('Company', companySchema);
