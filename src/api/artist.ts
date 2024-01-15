
import { Router } from 'express';
import artistController from './controllers/artistController';

export const artistRouter = Router();
artistRouter.get('/artists', artistController.listAllArtist);
artistRouter.get('/artist/:artistId',  artistController.listOneArtist);
artistRouter.post('/artist', artistController.saveArtist);
artistRouter.put('/artist/:artistId', artistController.updateArtist);
artistRouter.delete('/artist/:artistId', artistController.deleteArtist);



