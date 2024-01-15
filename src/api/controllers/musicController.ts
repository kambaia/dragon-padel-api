import { Request, Response } from 'express';
import { Single } from '../model/Delivery';
class SingleController {
  public async listAllSingle(req: Request, res: Response): Promise<void> {
    const { limit = 25, page = 0 } = req.query;
    try {
      const singles = await Single.find({})
        .limit(Number(limit))
        .skip(Number(page))
        .populate('artist', '_id  artistName profilePicture')
        .populate('participant', '_id  artistName profilePicture')
        .populate('user', '_id  fullName profile');
      if (!limit || !page) {
        res.status(200).send(singles);
      } else {
        res.status(200).send(singles);
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async listOneSingle(req: Request, res: Response): Promise<void> {
    try {
      const { singeId } = req.params;
      if (singeId) {
        const singe = await Single.findById(singeId)
          .populate('artist', '_id  artistName profilePicture')
          .populate('participant', '_id  artistName profilePicture')
          .populate('user', '_id  fullName profile');
        if (singe) {
          res.status(200).send(singe);
        } else {
          res
            .status(404)
            .send({ message: 'Não foi encontrada nenhuma evento.' });
        }
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async saveSingle(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);
      const data = await Single.create(req.body);
      res.status(201).json({ success: 'Musica salvo  com sucesso', data });
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }

  public async updateSingle(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const { singleId } = req.params;
      if (singleId) {
        const single = await Single.findByIdAndUpdate(
          { _id: singleId },
          { $set: data },
          { new: false }
        );
        res.status(204).json({
          message: 'As suas informações foram actualizadas com sucesso',
          single,
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Aconteceu um erro ao atualizada', error });
    }
  }

  public async deleteSingle(req: Request, res: Response): Promise<void> {
    try {
      const { singleId } = req.params;
      if (singleId) {
        const single = await Single.findByIdAndDelete(singleId);
        if (single) {
          res.status(204).send({
            message: 'A informação foi deletada com sucesso',
            event,
          });
        } else {
          res.status(204).send({
            message: 'A informação não foi deletada',
          });
        }
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }
}

export default new SingleController();
