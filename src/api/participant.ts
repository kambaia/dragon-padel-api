import { Router } from 'express';
import participantControllers from './controllers/participantController';
import multer from 'multer';
export const participantRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});


participantRouter.post('/participant', upload.fields([
  { name: 'profile', maxCount: 1 },
]), participantControllers.createParticipant);

participantRouter.get('/participant', participantControllers.listAllParticipants);
participantRouter.get('/participant/:participantId', participantControllers.getParticipant);
participantRouter.put('/participant/:participantId', participantControllers.updateParticipant);
participantRouter.delete('/participant/:participantId', participantControllers.deleteParticipant);
