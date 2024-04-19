import { Request, Response } from 'express';
import { ISearch } from '../../interfaces/app/search';
import { IStock } from '../../interfaces/ProdutosInterface';
import StockService from '../services/stock';
import MovimentService from '../services/moviment';
import { getDataFormat, getTimeFormat } from '../../util/functionshelp';
import { fetchAllDataStock, responseDataStock} from '../../util/dataFetching/stock';


class StockController {
  public async listAllStock(req: Request, res: Response): Promise<void> {
    try {
      const { limit = 25, page } = req.query as unknown as ISearch;
      const stock = (await StockService.findAllStock({
        limit,
        page,
      })) as IStock[];
       const allDataStock = await fetchAllDataStock(stock.sort((a, b) => b.productQuantity - a.productQuantity));
      const responseData = responseDataStock(allDataStock, Number(0));
      res.status(200).send(responseData);
    } catch (error) {
      res.status(404).send(error);

    }
  }

  public async listOneStock(req: Request, res: Response): Promise<void> {
    try {
      const { stockId } = req.params;
      const stock = (await StockService.findOneStock(
        stockId
      )) as IStock;
      if (stock) {
        res.status(200).send(stock);
      } else {
        res
          .status(404)
          .send({ message: 'Não foi encontrada nenhuma producto em stock.' });
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async saveStock(req: Request, res: Response): Promise<void> {
    try {

      const { productId, productQuantity, supplier} = req.body;
      const newStock = {
        product: productId,supplier: supplier, productQuantity: parseInt(productQuantity)
      } as IStock

      const stockData = (await StockService.findExisteProduct(productId)) as IStock;
      if (stockData) {
        const totalQuantity = stockData.productQuantity + newStock.productQuantity;
        const stock = await StockService.updateStock(stockData._id!, { product: productId, supplier:supplier, productQuantity: totalQuantity }) as IStock;
        if (stock) {
          await MovimentService.saveMoviment({
            productQuantity: newStock.productQuantity,
            movementDay: getDataFormat(),
            movementTime: getTimeFormat(),
            entry: true,
            productOutput: false,
            productInStock: stockData._id!,
          });
        }
        res
          .status(201)
          .json({ success: 'Cadastro feito  com sucesso', stock });
      } else {

        const stockData = (await StockService.saveStock(newStock)) as IStock;
        if (stockData) {
          await MovimentService.saveMoviment({
            productQuantity: newStock.productQuantity,
            movementDay: getDataFormat(),
            movementTime: getTimeFormat(),
            entry: true,
            productOutput: false,
            productInStock: stockData._id!,
          });
          res
            .status(201)
            .json({ success: 'Cadastro feito  com sucesso', stockData });

        }
      }
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }

  public async updateStock(req: Request, res: Response): Promise<void> {
    try {
      const inputs = req.body;
      const { stocktId } = req.params;
      const stock = await StockService.updateStock(stocktId, inputs);
      res.status(204).json({
        message: 'As suas informações foram actualizadas com sucesso',
        stock,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Aconteceu um erro ao atualizada', error });
    }
  }

  public async deleteStock(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { stockId } = req.params;
      const request = await StockService.deleteStock(stockId);
      if (Request) {
        return res.status(204).send('Deletado com sucesso');
      }
      return res.status(404).send(Request);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
}

export default new StockController();
