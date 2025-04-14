import mongoose, { Model, Schema } from "mongoose";
import { IProduct } from "../../interfaces/generoInterface";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true},
  description: { type: String },
  category: { type: String, required: true },
  color:{ type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  supplier: {
    name: { type: String },
    contact: { type: String }
  }
});

export const Product: Model<IProduct> =
  mongoose.models.Category || mongoose.model('Product', ProductSchema);

