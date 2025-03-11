import mongoose, { Model, model, Schema, Types } from "mongoose";
import { IReservation } from "../../interfaces/generoInterface";

const reservationSchema = new Schema<IReservation>({
    name:  {
        type: String
    },
    description: {
        type: String
    },
    pitch: {
        type: String
    },
    creator_id: {
        type: Types.ObjectId,
        ref: 'User'
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    club: {
        type: String,
        maxlength: 100
    },
    price: {
        type: Number
    },
    newGame: {
        type: Boolean
    },
    field: {
        type: String,
        maxlength: 100
    },
    participants: [{
        type: Types.ObjectId,
        ref: 'Participant',
        required: true
    }]
}, { timestamps: true });
export const Reservation: Model<IReservation> =
    mongoose.models.Reservation || mongoose.model('Reservation', reservationSchema);





export type IParticipant = {
    _id: any;
    profile: string;
    name: string;
    gender: string;
    numberOfGames: string;
    category: string;
    profilePicture: string;
}

