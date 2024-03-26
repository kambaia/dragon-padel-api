import { Request, Response } from 'express';
import MovimentService from '../services/moviment';
import { Imovements } from '../../interfaces/ProdutosInterface';
import { ISearch } from '../../interfaces/app/search';
import { Movement } from '../model/Movements';



class MovementsController {
  public async listAllMovement(req: Request, res: Response): Promise<void> {
    const { limit = 10, page } = req.query;
    try {
      const { limit = 25, page = 0 } = req.query as unknown as ISearch;
        const product = (await MovimentService.findAllMoviment({ limit, page })) as Imovements[];
      res.status(200).send(product);
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async listOneMovements(req: Request, res: Response): Promise<void> {
    try {
      const { movementsId } = req.params;
      const movimentResult = (await MovimentService.findOneMoviment(
        movementsId
      )) as Imovements;
      if (movimentResult) {
        res.status(200).send(movimentResult);
      } else {
        res
          .status(404)
          .send({ message: 'Não foi encontrada nenhuma movemento.' });
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }
}

export default new MovementsController();
