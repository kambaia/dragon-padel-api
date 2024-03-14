import { Request, Response } from 'express';
import RquestService from '../services/request';
import { ISearch } from '../../interfaces/app/search';
import { IRequest } from '../../interfaces/ProdutosInterface';
class RequestController {
  public async listAllRequestt(req: Request, res: Response): Promise<void> {
    const { limit = 10, page } = req.query;
    try {
      const { limit = 25, page } = req.query as unknown as ISearch;
      const responseData = (await RquestService.findAllRequest({
        limit,
        page,
      })) as IRequest[];
      
      res.status(200).send(responseData);
    } catch (error) {
      res.status(404).send(error);

    }
  }

  public async listOneRequest(req: Request, res: Response): Promise<void> {
    try {
      const { requestId } = req.params;
      const product = (await RquestService.findOneRequest(
        requestId
      )) as IRequest;
      if (product) {
        res.status(200).send(product);
      } else {
        res
          .status(404)
          .send({ message: 'Não foi encontrada nenhuma pedido.' });
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async saveRequest(req: Request, res: Response): Promise<void> {
    try {
      const inputs = {
        RequestName: req.body.RequestName,
        active: true,
        isAvailable: true,
        company: req.body.company,
      };
      const requestData = (await RquestService.saveRequest(req.body)) as IRequest;

        res
          .status(201)
          .json({ success: 'Cadastro feito  com sucesso', ...requestData });

    } catch (error) {
      res.status(500).send({ message: error });
    }
  }

  public async updateRequestt(req: Request, res: Response): Promise<void> {
    try {
      const inputs = req.body;
      const { RequestId } = req.params;
      const request = await RquestService.updateRequest(RequestId, inputs);
      res.status(204).json({
        message: 'As suas informações foram actualizadas com sucesso',
        request,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Aconteceu um erro ao atualizada', error });
    }
  }

  public async deleteRequest(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { RequestId } = req.params;
      const request = await RquestService.deleteRequest(RequestId);
      if (Request) {
        return res.status(204).send('Deletado com sucesso');
      }
      return res.status(404).send(Request);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
}

export default new RequestController();
