export interface ITask extends Document {
  _id: string;
  description: string;
  priority: string;
  statusTask: boolean;
  creationDate: Date;
  createdAt: Date;
  updatedAt: Date;
  assignments: IAssignment[];
}

export interface IAssignment extends Document {
  _id: string;
  assignee: string;
  assignmentDate: Date;
  startDate: Date;
  endDate: Date;
  progress: boolean;
  completed: boolean;
  started: boolean;
  priority: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
