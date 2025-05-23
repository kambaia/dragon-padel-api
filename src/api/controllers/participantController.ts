import { Request, Response } from 'express';
import { ISearch } from '../../interfaces/app/search';
import { Participant } from '../model/ParticipantSchema';
import { fetchAllDataParticipant, responseDataParticipant } from '../../util/dataFetching/participant';
import { CloudflareService } from '../../util/cloudflare';
class ParticipantController {
  private cloudflare: CloudflareService;
  constructor() {
    this.cloudflare = new CloudflareService();
    this.createParticipant = this.createParticipant.bind(this);
  }
  createParticipant = async (req: Request, res: Response): Promise<void> => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const urls: { profile?: string; pdf_url?: string } = {};
      if (files?.profilePicture && files.profilePicture[0]) {
        const imageUrl = await this.cloudflare.uploadFile('participant', files.profilePicture[0]);
        urls.profile = imageUrl;
      }
      // Se for apenas uma URL enviada no body
      if (req.body.profile && !urls.profile) {
        urls.profile = req.body.profile;
      }
  
      const dadosParticipant = req.body;

      const participant = await Participant.create({ ...dadosParticipant, ...urls });
  
      res.status(201).json({
        message: 'Participant created successfully',
        participant
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating participant', error });
    }
  };
  



  public async listAllParticipants(req: Request, res: Response): Promise<void> {

    const { limit = 25, page = 0 } = req.query as unknown as ISearch;
    try {
      const participants = await Participant.find()
        .limit(Number(limit))
        .skip(Number(page) * Number(limit))
        .populate('user_id');
      const allDataUser = await fetchAllDataParticipant(participants)
      const responseData = responseDataParticipant(allDataUser, Number(0));
      res.status(200).json(responseData);
    } catch (error) {
      res.status(404).json({ message: 'Error fetching participants', error });
    }
  }

  public async getParticipant(req: Request, res: Response): Promise<void> {
    try {
      const { participantId } = req.params;
      const participant = await Participant.findById(participantId)
        .populate('user_id');

      if (participant) {
        res.status(200).json(participant);
      } else {
        res.status(404).json({ message: 'Participant not found' });
      }
    } catch (error) {
      res.status(404).json({ message: 'Error fetching participant', error });
    }
  }

  public async updateParticipant(req: Request, res: Response): Promise<void> {
    try {
      const { participantId } = req.params;
      const updateData = req.body;

      const participant = await Participant.findByIdAndUpdate(
        participantId,
        updateData,
        { new: true }
      )
        .populate('user_id');

      if (participant) {
        res.status(200).json({
          message: 'Participant updated successfully',
          participant
        });
      } else {
        res.status(404).json({ message: 'Participant not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating participant', error });
    }
  }

  public async deleteParticipant(req: Request, res: Response): Promise<void> {
    try {
      const { participantId } = req.params;
      const participant = await Participant.findByIdAndDelete(participantId);

      if (participant) {
        res.status(200).json({
          message: 'Participant deleted successfully',
          participant
        });
      } else {
        res.status(404).json({ message: 'Participant not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting participant', error });
    }
  }

  public async getParticipantsByCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.params;
      const { limit = 25, page = 0 } = req.query as unknown as ISearch;
      const participants = await Participant.find({ category_id: categoryId })
        .limit(Number(limit))
        .skip(Number(page) * Number(limit))
        .populate('user_id');

      res.status(200).json(participants);
    } catch (error) {
      res.status(404).json({ message: 'Error fetching participants by category', error });
    }
  }

  public async getParticipantsByUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { limit = 25, page = 0 } = req.query as unknown as ISearch;

      const participants = await Participant.find({ user_id: userId })
        .limit(Number(limit))
        .skip(Number(page) * Number(limit))
        .populate('user_id');

      res.status(200).json(participants);
    } catch (error) {
      res.status(404).json({ message: 'Error fetching participants by user', error });
    }
  }
}

export default new ParticipantController();