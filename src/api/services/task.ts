// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import { User } from '../model/User';
import { IUser, IUserRegister } from '../../interfaces/UserInterface';
import { handleMongoError } from '../../util/errors/api-error';
import { ISearch } from '../../interfaces/app/search';
import { Task } from '../model/Task';
import { Assignment } from '../model/Assignment';
import { IAssignment } from '../../interfaces/TaskInterface';
export default class AuthService {
  public static async findAllUser({ limit, page }: ISearch) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await User.find({})
          .limit(Number(limit))
          .skip(Number(page))
          .populate('permission', '_id  id role type')
          .populate({
            path: 'department',
            populate: { path: 'company' },
          });
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async findOneUser(userId: string) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = (await User.findById(userId).populate(
          'permission',
          '_id  id role type'
        )) as IUser;
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async createTaskAndAssociateAssignment(
    assignmentInputs: IAssignment,
    taskId: string
  ) {
    return new Promise(async function (resolve, reject) {
      const createTaskAndAssociateAssignment = async () => {
        try {
          const task = await Task.findById(taskId);
          // Associate assignment with the task
          if (task) {
            const assignment = await Assignment.create(assignmentInputs);
            task.assignments.push(assignment);
            const result = await User.findByIdAndUpdate(
              { _id: taskId },
              { $set: task },
              { new: false }
            );
            resolve(result);
          } else {
            reject({
              message: `Não foi encontrada nenhuma tarefa com este id=>${taskId}`,
            });
          }
        } catch (error: unknown) {
          reject(handleMongoError(error));
        }
      };
    });
  }
  public static async updateUser(userId: string, user: IUserRegister) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await User.findByIdAndUpdate(
          { _id: userId },
          { $set: user },
          { new: false }
        );
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }

  public static async deleteUser(userId: string) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await User.findByIdAndDelete(userId);
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
}
