import { Model } from "mongoose";
import { IInstructor } from "../../interfaces/generoInterface";

const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String // URL or file path to the image
  },
  personalData: {
    gender: {
      type: String,
      enum: ['Masculino', 'Feminino', 'Outro']
    },
    address: String,
    email: {
      type: String,
      required: true
    },
    contact: String
  },
  professionalData: {
    experienceLevel: {
      type: String,
      enum: ['Iniciante', 'Intermediário', 'Avançado']
    },
    classType: String
  },
  financialData: {
    hourlyRate: {
      type: Number 
    },
    paymentType: {
      type: String,
      enum: ['Fixo Mensal', 'Por Hora', 'Por Aula']
    }
  },
  administrativeData: {
    studentCount: Number,
    classCount: Number,
  }
});

export const Instructor: Model<IInstructor> =
    mongoose.models.Instructor || mongoose.model('Instructor', InstructorSchema);

