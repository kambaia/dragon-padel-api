/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model, Schema } from 'mongoose';
import { IProdutoCategory } from '../../interfaces/ProdutosInterface';
import { ITask } from '../../interfaces/TaskInterface';

const taskSchema: Schema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    description: String,
    statusTask: Boolean,
    priority: String,
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
  },
  { timestamps: true }
);
export const Task: Model<ITask> =
  mongoose.models.Task || mongoose.model('Task', taskSchema);
