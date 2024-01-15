import { Request, Response } from 'express';
import { IEvents } from '../../interfaces/CompanyInterface';
import { Event } from '../model/Company';
class EventController {
  public async listAllEvents(req: Request, res: Response): Promise<void> {
    const { limit = 25, page = 0 } = req.query;
    try {
      const events = (await Event.find({})
        .limit(Number(limit))
        .skip(Number(page))
        .populate('user', '_id  fullName profile')) as IEvents[];
      if (!limit || !page) {
        res.status(200).send(events);
      } else {
        res.status(200).send(events);
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async listOneEvent(req: Request, res: Response): Promise<void> {
    try {
      const { eventId } = req.params;
      if (eventId) {
        const event = (await Event.findById(eventId).populate(
          'user',
          '_id  fullName profile'
        )) as IEvents;

        if (event) {
          res.status(200).send(event);
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

  public async saveEvent(req: Request, res: Response): Promise<void> {
    try {
      const data = await Event.create(req.body);
      res.status(201).json({ success: 'Cadastro feito  com sucesso', data });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error });
    }
  }

  public async updateEvent(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const { eventId } = req.params;
      if (eventId) {
        const event = await Event.findByIdAndUpdate(
          { _id: eventId },
          { $set: data },
          { new: false }
        );
        res.status(204).json({
          message: 'As suas informações foram actualizadas com sucesso',
          event,
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Aconteceu um erro ao atualizada', error });
    }
  }

  public async deleteEvent(req: Request, res: Response): Promise<void> {
    try {
      const { eventId } = req.params;
      if (eventId) {
        const event = await Event.findByIdAndDelete(eventId);
        if (event) {
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

export default new EventController();
