
import { Router } from 'express';
import eventController from '../api/controllers/eventController';

export const eventRouter = Router();
eventRouter.get('/events', eventController.listAllEvents);
eventRouter.get('/event/:eventId',  eventController.listOneEvent);
eventRouter.post('/event', eventController.saveEvent);
eventRouter.put('/event/:eventId', eventController.updateEvent);
eventRouter.delete('/event/:eventId', eventController.deleteEvent);



