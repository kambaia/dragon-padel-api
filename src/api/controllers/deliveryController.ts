import { Request, Response } from 'express';
import { Delivery } from '../model/Delivery';
import { IDelivery, IDeliveryRegister, IProduct, IStock } from '../../interfaces/ProdutosInterface';
import {
  responseDatadelivery,
  fetchAllDatadelivery,
} from '../../util/dataFetching/delivery';
import MovimentService from '../services/moviment';
import { getDataFormat, getTimeFormat } from '../../util/functionshelp';
import deliveryService from '../services/delivery';
import StockService from '../services/stock';
import { ISearch } from '../../interfaces/app/search';
import { Stock } from '../model/Stock';

class deliveryController {
  public async listAllDelivery(req: Request, res: Response): Promise<void> {
    const { limit = 25, page } = req.query as unknown as ISearch;
    try {
      const delivery = (await deliveryService.findAllDelivery({
        limit,
        page,
      })) as IDelivery[];
      console.log(delivery);
      const allDataUser = await fetchAllDatadelivery(delivery);
      const responseData = responseDatadelivery(allDataUser, Number(0));

      res.status(200).send(responseData);
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async listOneDelivery(req: Request, res: Response): Promise<void> {
    try {
      const { deliveryId } = req.params;
      const delivery = (await deliveryService.findOneDelivery(
        deliveryId
      )) as IDelivery;
      if (delivery) {
        res.status(200).send(delivery);
      } else {
        res.status(404).send({ message: 'Não foi encontrada nenhuma pedido.' });
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }


  public async saveDelivery(req: Request, res: Response): Promise<void> {
    try {
        const deliveryDetails = req.body as IDeliveryRegister;
        const stockData = (await StockService.findExisteProduct(deliveryDetails.product)) as IStock;
        if (stockData) {
          const totalQuantity = stockData.productQuantity - deliveryDetails.deliveryQuantity;
          const stock = await StockService.updateStock(stockData._id!, { product: deliveryDetails.product, productQuantity: totalQuantity }) as IStock;
          if (stock) {
            await MovimentService.saveMoviment({
              productQuantity: deliveryDetails.deliveryQuantity,
              movementDay: getDataFormat(),
              movementTime: getTimeFormat(),
              entry: false,
              productOutput: true,
              product: deliveryDetails.product,
            });
            const resultDelivery = await deliveryService.saveDelivery(deliveryDetails);  
            res
            .status(201)
            .json({ success: 'Cadastro feito  com sucesso', resultDelivery});
          }else{
            res.status(500).json({ message: 'Aconteceu um erro ao atualizada o stock'});
          }
        }else{
          res.status(500).send({ message: 'Não foi encontrado nenhum produto em estoque com esta referencia!' });
        }
      
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }


  public async updateStock(products: IProduct[]): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      throw new Error('Erro ao atualizar estoque.');
    }
  }

  public async updateDelivery(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const { deliveryId } = req.params;
      const delivery = await Delivery.findByIdAndUpdate(
        { _id: deliveryId },
        { $set: data },
        { new: false }
      );
      res.status(204).json({
        message: 'As suas informações foram actualizadas com sucesso',
        delivery,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Aconteceu um erro ao atualizada', error });
    }
  }

  public async deleteDelivery(req: Request, res: Response): Promise<Response> {
    try {
      const { deliveryId } = req.params;
      const delivery = await Delivery.findByIdAndDelete(deliveryId);
      if (delivery) {
        return res.status(204).send('Deletado com sucesso');
      }
      return res.status(404).send(delivery);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
}

export default new deliveryController();
