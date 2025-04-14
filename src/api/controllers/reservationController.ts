import { Request, Response } from 'express';
import { IReservation } from '../../interfaces/generoInterface';
import { ISearch } from '../../interfaces/app/search';
import { fetchAllDataReservation, responseDataReservation } from '../../util/dataFetching/reservation';
import { Reservation } from '../model/Reservation';

class ReservationController {
    public async listAllReservations(req: Request, res: Response): Promise<void> {
        const { limit = 25, page = 0 } = req.query as unknown as ISearch;
        try {
            const reservations = await Reservation.find()
            .populate('participants')
                .limit(Number(limit))
                .skip(Number(page) * Number(limit));
            
            const allDataUser = await fetchAllDataReservation(reservations)
            const responseData = responseDataReservation(allDataUser, Number(0));

            res.status(200).json(responseData);
        } catch (error) {
            console.log(error)
            res.status(404).json({ message: 'Error fetching reservations', error });
        }
    }

    public async getReservation(req: Request, res: Response): Promise<void> {
        try {
            const { reservationId } = req.params;
            const reservation = await Reservation.findById(reservationId)
                .populate('creator_id')
                .populate('participants');

            if (reservation) {
                res.status(200).json(reservation);
            } else {
                res.status(404).json({ message: 'Reservation not found' });
            }
        } catch (error) {
            res.status(404).json({ message: 'Error fetching reservation', error });
        }
    }

    public async createReservation(req: Request, res: Response): Promise<void> {
        try {
            const reservationData: IReservation = {
                ...req.body,
                creator_id: req.body.creator_id,
                creation_date: new Date()
            };

            const reservation = await Reservation.create(reservationData);
            res.status(201).json({
                message: 'Reservation created successfully',
                reservation: reservation
            });
        } catch (error) {
            res.status(500).json({ message: 'Error creating reservation', error });
        }
    }

    public async updateReservation(req: Request, res: Response): Promise<void> {
        try {
            const { reservationId } = req.params;
            const updateData = req.body;

            const reservation = await Reservation.findByIdAndUpdate(
                reservationId,
                updateData,
                { new: true }
            ).populate('creator_id').populate('participants');

            if (reservation) {
                res.status(200).json({
                    message: 'Reservation updated successfully',
                    reservation
                });
            } else {
                res.status(404).json({ message: 'Reservation not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating reservation', error });
        }
    }

    public async deleteReservation(req: Request, res: Response): Promise<void> {
        try {
            const { reservationId } = req.params;
            const reservation = await Reservation.findByIdAndDelete(reservationId);

            if (reservation) {
                res.status(200).json({
                    message: 'Reservation deleted successfully',
                    reservation
                });
            } else {
                res.status(404).json({ message: 'Reservation not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting reservation', error });
        }
    }
}

export default new ReservationController();