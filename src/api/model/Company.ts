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
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
companySchema.virtual('logo_url').get(function () {
  return `http://localhost:5000/files/company/${this.thumbnail}`;
});
// Export the model and return your IUser interface
export const Company: Model<ICompany> =
  mongoose.models.Company || mongoose.model('Company', companySchema);
