import mongoose, { Model, Schema } from "mongoose";
import { ICategory } from "../../interfaces/generoInterface";

const categorySchema = new Schema<ICategory>({
    categoryName: {
        type: String,
        required: true,
        maxlength: 50
    },
    description: {
        type: String
    }
}, { timestamps: true });

export const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model('category', categorySchema);
