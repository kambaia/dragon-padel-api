/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model } from 'mongoose';
import {IStock } from '../../interfaces/ProdutosInterface';

const stockSchema  = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productQuantity: { type: Number},
    supplier: { type: String},
    active: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true,
  }
);
// Export the model and return your IUser interface
export const Stock: Model<IStock> =
  mongoose.models.Stock || mongoose.model('stock', stockSchema);
