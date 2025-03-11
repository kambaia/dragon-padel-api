import { Router } from 'express';
import participantControllers from './controllers/participantController';

export const participantRouter = Router();
participantRouter.get('/participant', participantControllers.listAllParticipants);
participantRouter.get('/participant/:participantId', participantControllers.getParticipant);
participantRouter.post('/participant', participantControllers.createParticipant);
participantRouter.put('/participant/:participantId', participantControllers.updateParticipant);
participantRouter.delete('/participant/:participantId', participantControllers.deleteParticipant);
