import { Router } from 'express';
import rolesControllers from './controllers/reservationController';

export const reservationRouter = Router();
reservationRouter.get('/reservation', rolesControllers.listAllReservations);
reservationRouter.get('/reservation/:reservationId', rolesControllers.getReservation);
reservationRouter.get('/Summary/', rolesControllers.getSummary);
reservationRouter.post('/reservation', rolesControllers.createReservation);
reservationRouter.put('/reservation/:reservationId', rolesControllers.updateReservation);
reservationRouter.delete('/reservation/:reservationId', rolesControllers.deleteReservation);
