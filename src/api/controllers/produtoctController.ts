import { Request, Response } from 'express';
/* import {
  fetchAllDataAConpany,
  responseDataCompany,
} from '../../util/dataFetching/company';
 */
import { Product } from '../model/Product';
import { IProduct } from '../../interfaces/ProdutosInterface';
import {
  responseDataProduct,
  fetchAllDataProduct,
} from '../../util/dataFetching/product';

import ProductService from '../services/product';

import { ISearch } from '../../interfaces/app/search';

class ProductController {
  public async listAllproduct(req: Request, res: Response): Promise<void> {
    const { limit = 25, page } = req.query as unknown as ISearch;
    try {
      const product = (await ProductService.findAllProduct({
        limit,
        page,
      })) as IProduct[];

      const allDataUser = await fetchAllDataProduct(product);
      const responseData = responseDataProduct(allDataUser, Number(0));

      res.status(200).send(responseData);
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async listOneproduct(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const product = (await ProductService.findOneProduct(
        productId
      )) as IProduct;
      if (product) {
        res.status(200).send(product);
      } else {
        res
          .status(404)
          .send({ message: 'Não foi encontrada nenhuma produto.' });
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async saveProduct(req: Request, res: Response): Promise<void> {
    console.log(req.body);
    console.log('', req.file);
    try {
      const inputs = {
        productCover: req.file?.filename,
        ...req.body,
      };
      const data = (await ProductService.saveProduct(inputs)) as IProduct;
      const dataProduct = {
        id: data._id,
      };
      res
        .status(201)
        .json({ success: 'Cadastro feito  com sucesso', ...dataProduct });
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }

  public async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const { productId } = req.params;
      const product = await Product.findByIdAndUpdate(
        { _id: productId },
        { $set: data },
        { new: false }
      );
      res.status(204).json({
        message: 'As suas informações foram actualizadas com sucesso',
        product,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Aconteceu um erro ao atualizada', error });
    }
  }

  public async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { productId } = req.params;
      const product = await Product.findByIdAndDelete(productId);
      if (product) {
        return res.status(204).send('Deletado com sucesso');
      }
      return res.status(404).send(product);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
}

export default new ProductController();
