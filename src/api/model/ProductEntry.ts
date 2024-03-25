/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model, Schema } from 'mongoose';
import {IProductEntry } from '../../interfaces/ProdutosInterface';

const productEntrySchema  = new mongoose.Schema(
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

productEntrySchema.virtual('document_url').get(function () {
  return `http://localhost:5000/files/product/doc/${this.invoiceDocument}`;
});

// Export the model and return your IUser interface
export const ProductEntry: Model<IProductEntry> =
  mongoose.models.ProductEntry || mongoose.model('productEntry', productEntrySchema);
