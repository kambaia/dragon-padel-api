/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model, Schema } from 'mongoose';
import { IProduct } from '../../interfaces/ProdutosInterface';

const productSchema = new mongoose.Schema(
  {
    serialNumber: String,
    productCover: String,
    model: String,
    brand: String,
    specification: String,
    technicalDescription: String,
    description: String,
    condition: String,
    sourceOfPurchase: String,
    purchaseDate: String,
    invoice: String,
    active: Boolean,
    isAvailable: Boolean,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProdutoCategory', // Make sure you have a model for Category
    },
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
productSchema.virtual('cover_url').get(function () {
  return `http://localhost:5000/files/product/${this.productCover}`;
});

// Export the model and return your IUser interface
export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model('Product', productSchema);
