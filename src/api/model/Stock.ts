/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model, Schema } from 'mongoose';
import {IProductInStock } from '../../interfaces/ProdutosInterface';

const productInStockSchema  = new mongoose.Schema(
  {
    documentNumber: {
      type: String,
    },
    supplier: {
      type: String,
    },

    invoiceDocument: {
      type: String,
    },
    product: [{
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      productQuantity: { type: Number},
    }],
    registerby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Make sure you have a model for user
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Export the model and return your IUser interface
export const ProductInStock: Model<IProductInStock> =
  mongoose.models.ProductInStock || mongoose.model('ProductInStock', productInStockSchema);
