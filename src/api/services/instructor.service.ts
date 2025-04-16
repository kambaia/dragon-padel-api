import { FilterQuery } from "mongoose";

import { Instructor } from "../model/Instructor";
import { IInstructor, InstructorQueryParams } from "../../interfaces/generoInterface";

class InstructorService {
  async createInstructor(data: IInstructor): Promise<IInstructor> {
    try {
      const instructor = new Instructor(data);
      return await instructor.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error creating instructor: ${error.message}`);
      }
      throw new Error("An unknown error occurred while creating the instructor");
    }
  }

  async getAllInstructors(params: InstructorQueryParams = {}): Promise<{
    instructors: IInstructor[];
    totalInstructors: number;
    totalPages: number;
    currentPage: number;
  }> {
    try {
      const {
        search = '',
        gender,
        experienceLevel,
        classType,
        sort = 'createdAt',
        page = 1,
        limit = 10
      } = params;

      const query: FilterQuery<IInstructor> = {};

      if (search) {
        query.$or = [
          { fullName: { $regex: search, $options: 'i' } },
          { "personalData.address": { $regex: search, $options: 'i' } },
          { "professionalData.classType": { $regex: search, $options: 'i' } },
        ];
      }

      if (gender) {
        query["personalData.gender"] = gender;
      }

      if (experienceLevel) {
        query["professionalData.experienceLevel"] = experienceLevel;
      }

      if (classType) {
        query["professionalData.classType"] = classType;
      }

      const skip = (page - 1) * limit;

      const instructors = await Instructor.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit);

      const totalInstructors = await Instructor.countDocuments(query);
      const totalPages = Math.ceil(totalInstructors / limit);

      return {
        instructors,
        totalInstructors,
        totalPages,
        currentPage: page
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error fetching instructors: ${error.message}`);
      }
      throw new Error("An unknown error occurred while fetching instructors");
    }
  }

  async getInstructorById(id: string): Promise<IInstructor | null> {
    try {
      return await Instructor.findById(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error fetching instructor: ${error.message}`);
      }
      throw new Error("An unknown error occurred while fetching the instructor");
    }
  }

  async updateInstructor(id: string, updateData: Partial<IInstructor>): Promise<IInstructor | null> {
    try {
      return await Instructor.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error updating instructor: ${error.message}`);
      }
      throw new Error("An unknown error occurred while updating the instructor");
    }
  }

  async deleteInstructor(id: string): Promise<IInstructor | null> {
    try {
      return await Instructor.findByIdAndDelete(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error deleting instructor: ${error.message}`);
      }
      throw new Error("An unknown error occurred while deleting the instructor");
    }
  }

  async getInstructorsByClassType(classType: string): Promise<IInstructor[]> {
    try {
      return await Instructor.find({ "professionalData.classType": classType });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error fetching instructors by class type: ${error.message}`);
      }
      throw new Error("An unknown error occurred while fetching instructors by class type");
    }
  }
}

export default new InstructorService();
