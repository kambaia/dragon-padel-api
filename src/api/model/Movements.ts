/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model, Schema } from 'mongoose';
import { ImovementsRegister } from '../../interfaces/ProdutosInterface';
// eslint-disable-next-line @typescript-eslint/naming-convention

const movementsSchema: Schema = new Schema(
    {
        productQuantity: { type: Number, required: true },
        movementDay: { type: String, required: true },
        movementTime: { type: String, required: false },
        entry: { type: Boolean, default: false },
        productOutput: { type: Boolean, default: false },
        delivery: { type: mongoose.Schema.Types.ObjectId,ref: 'Delivery'},
        productInStock: { type: mongoose.Schema.Types.ObjectId, ref: 'stock'},
        active: {
            type: Boolean,
            default: true
          },
        
    },
    { timestamps: true }
);
export const Movement: Model<ImovementsRegister> =
    mongoose.models.Movement ||
    mongoose.model('movement', movementsSchema);
