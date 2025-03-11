
import { IReservation } from '../../interfaces/generoInterface';
export const fetchAllDataReservation = async (reservation: IReservation[]) => {
  let reservationResult = [];
  for (const [index, ct] of reservation.entries()) {
    reservationResult.push({
      id: ct._id,
      reservationName: ct?.name,
      description: ct?.description,
      pitch: ct?.pitch,
      newGame: ct.newGame,
      creator_id: ct?.creator_id,
      creation_date: ct?.creation_date,
      start_time: ct?.startTime,
      end_time: ct?.endTime,
      club: ct.club,
      price: ct?.price,
      field: ct?.field,
      participants: ct.participants
    });
  }
  return reservationResult;
};

export const responseDataReservation = (data: any, page: number) => {
  return {
    reservations: data,
    currentPage: Number(page),
    hasMorePages: true,
    lastPage: Number(page),
    perPage: data.length,
    prevPageUrl: null,
    total: data.length,
  };
};
