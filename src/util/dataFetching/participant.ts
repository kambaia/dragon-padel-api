
import { IParticipant } from '../../interfaces/generoInterface';
export const fetchAllDataParticipant = async (participant: IParticipant[]) => {
    let participantResult = [];
    for (const [index, ct] of participant.entries()) {
        participantResult.push({
            id: ct._id,
            participantName: ct?.name,
            profile: ct?.profile,
            gender: ct?.gender,
            numberOfGames: ct?.numberOfGames,
            category: ct.category,
            user_id: ct.user_id,
            createdAt: ct.createdAt,
            updatedAt: ct.updatedAt,
        });
    }
    return participantResult;
};

export const responseDataParticipant = (data: any, page: number) => {
    return {
        participants: data,
        currentPage: Number(page),
        hasMorePages: true,
        lastPage: Number(page),
        perPage: data.length,
        prevPageUrl: null,
        total: data.length,
    };
};
