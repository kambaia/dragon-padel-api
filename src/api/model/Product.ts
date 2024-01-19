/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model, Schema } from 'mongoose';
import { IProduct } from '../../interfaces/ProdutosInterface';

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
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
});

// Export the model and return your IUser interface
export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model('Product', productSchema);
