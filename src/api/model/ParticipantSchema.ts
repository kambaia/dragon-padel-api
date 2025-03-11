import mongoose, { Schema, Types, Model } from 'mongoose';
import { IParticipant } from '../../interfaces/generoInterface';

const participantSchema = new Schema({
    profile: {
        type: String,
    },
    numberOfGames: {
        type: Number,
        maxlength: 24
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    gender: {
        type: String,
        maxlength: 20
    },
    category: {
        type: String,
        maxlength: 20
    },
    user_id: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

export const Participant: Model<IParticipant> =
    mongoose.models.Participant || mongoose.model('Participant', participantSchema);
