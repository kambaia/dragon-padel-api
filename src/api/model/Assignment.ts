/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Model, Schema } from 'mongoose';
import { IProdutoCategory } from '../../interfaces/ProdutosInterface';
import { IAssignment } from '../../interfaces/TaskInterface';
// eslint-disable-next-line @typescript-eslint/naming-convention
const assignmentSchema = new mongoose.Schema({
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming User model for the one who delivered
    required: true,
  },
  assignmentDate: { type: Date, default: Date.now },
  startDate: { type: Date },
  endDate: { type: Date },
  progress: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  started: { type: Boolean, default: false },
});

export const Assignment: Model<IAssignment> =
  mongoose.models.Assignment || mongoose.model('Assignment', assignmentSchema);
