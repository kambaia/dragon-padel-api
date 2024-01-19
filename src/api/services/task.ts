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
    task: IAssignment,
    taskId: string
  ) {
    return new Promise(async function (resolve, reject) {
      const createTaskAndAssociateAssignment = async () => {
        try {
          const task = await Task.create({
            description: 'Complete Report',
            priority: 'High',
            statusTask: false,
          });

          const assignment = await Assignment.create({
            assignee: 'John',
            startDate: new Date('2024-01-21'),
            endDate: new Date('2024-01-22'),
            progress: true,
            completed: false,
            started: true,
            priority: 'High',
            description: 'Report assignment',
          });

          // Associate assignment with the task

          task.assignments.push(assignment);
          await task.save();

          resolve(task);
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
