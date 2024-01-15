/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model, Schema } from 'mongoose';
import { IEvents } from '../../interfaces/CompanyInterface';
// eslint-disable-next-line @typescript-eslint/naming-convention

const companySchema: Schema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    address: String,
    active: Boolean,
    isAvailable: Boolean,
  },
  { timestamps: true }
);

// Export the model and return your IUser interface
export const Event: Model<IEvents> =
  mongoose.models.Event || mongoose.model('event', companySchema);
