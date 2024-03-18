



/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model, Schema } from 'mongoose';
import {IRequest } from '../../interfaces/ProdutosInterface';
// eslint-disable-next-line @typescript-eslint/naming-convention

const RequestSchema: Schema = new Schema(
    {
        equipment: { type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Assuming Product model for the delivered product
          },
        equipmentType: { type: String, required: false },
        requestedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Make sure you have a model for Category
        },
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee', // Make sure you have a model for Category
          },
        quantity: { type: Number, required: true },
        observation: { type: String, required: false },
        active: { type: Boolean, default: true },
        visible: { type: Boolean, default: true },
        received: { type: Boolean, default: false},
        processing: { type: Boolean, default: false}
    },
    { timestamps: true }
);
export const Request: Model<IRequest> =
    mongoose.models.Request ||
    mongoose.model('Request', RequestSchema);
