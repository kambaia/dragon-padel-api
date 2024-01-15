import { Request, Response } from 'express';
import { IArtists } from '../../interfaces/ArtistsInterface';
import { responseDataArtist, fetchAllDataArtist } from '../../util/dataFetching/artist';
import { Artist } from '../model/Artist';
class ArtistController {
  public async listAllArtist(req: Request, res: Response): Promise<void> {
    const { limit=25, page } = req.query;
    try {
      const artist = await Artist.find({})
        .limit(Number(limit))
        .skip(Number(page))
        .populate('user', '_id fullName profile');

	  if (!limit || !page) {
	  const allDataUser = await fetchAllDataArtist(artist);
	  const responseData = responseDataArtist(allDataUser, Number(page));
    
	  res.status(200).send(responseData);
	  } else {
        const allDataUser = await fetchAllDataArtist(artist);
        const responseData = responseDataArtist(allDataUser, Number(0));
        res.status(200).send(responseData);
	  }
    } catch (error) {
      res.status(404).send(error);
    }
  }
  
  public async listOneArtist(req: Request, res: Response): Promise<void> {
    try {
      const { artistId } = req.params;
      const artist = await Artist.findById(artistId)
        .populate('user', '_id fullName profile') as IArtists;
      if (artist) {
        res.status(200).send(artist);
      } else {
        res
          .status(404)
          .send({ message: 'Não foi encontrada nenhuma artist.' });
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async saveArtist(req: Request, res: Response): Promise<void> {
    try {
      const artist = await Artist.find({
        $or: [{ artistName: req.body.artistName }],
      });
      if (artist.length > 0) {
        res
          .status(409)
          .json({ error: 'Esse nome de usuário já existe. Experimente outro' });
      } else {
        const data = await Artist.create(req.body);

        const userdata = {
          profile: data.profilePicture,
          artistName: data.artistName,
          id: data._id,
        };
        res
          .status(201)
          .json({ success: 'Cadastro feito  com sucesso', ...userdata });
      }
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }

  public async updateArtist(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const { artistId } = req.params;
      const artist = await Artist.findByIdAndUpdate(
        { _id: artistId },
        { $set: data },
        { new: false },
      );
      res.status(204).json({
        message: 'As suas informações foram actualizadas com sucesso',
        artist,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Aconteceu um erro ao atualizada', error });
    }
  }

  public async deleteArtist(req: Request, res: Response): Promise<Response> {
    try {
      const { artistId } = req.params;
      const artist = await Artist.findByIdAndDelete(artistId);
      if (artist) {
        return res.status(204).send('Deletado com sucesso');
      }
      return res.status(404).send(artist);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
}

export default new ArtistController();
