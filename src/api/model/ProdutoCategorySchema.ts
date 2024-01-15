/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model, Schema } from 'mongoose';
import { IProdutoCategory } from '../../interfaces/ProdutosInterface';
// eslint-disable-next-line @typescript-eslint/naming-convention

const produtoCategorySchema: Schema = new Schema(
  {
    categoryName: String,
    description: String,
  },
  { timestamps: true }
);
export const ProdutoCategory: Model<IProdutoCategory> =
  mongoose.models.ProdutoCategory ||
  mongoose.model('ProdutoCategory', produtoCategorySchema);
