import { Request, Response, raw } from 'express';
import ProductEntryService from '../services/productEntry';
import { ISearch } from '../../interfaces/app/search';
import { deleteFileDocDataBase } from '../../util/deleteFile';
import { IProductEntry } from '../../interfaces/ProdutosInterface';
import { fetchAllDataProductStock, responseDataProductStock } from '../../util/dataFetching/productEntryk';
import { Console } from 'console';
class StockController {
  public async listAllProductEntry(req: Request, res: Response): Promise<void> {
    const { limit = 25, page = 0 } = req.query as unknown as ISearch;
    try {
      const product = (await ProductEntryService.findAllProductStock({ limit, page })) as IProductEntry[];
     
      const allDataProduct= await fetchAllDataProductStock(product);
      const responseData = responseDataProductStock(allDataProduct, Number(0));
    
      res.status(200).send(responseData);
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async listOneProductEntry(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      if (productId) {
        const product = (await ProductEntryService.findOneProductStock(productId)) as IProductEntry;
        if (product) {
          res.status(200).send(product);
        } else {
          res
            .status(404)
            .send({ message: 'Não foi encontrada nenhuma producto.' });
        }
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async saveProductEntry(req: Request, res: Response): Promise<void> {
    try {
  
        const inputs = {
          ...req.body,
          invoiceDocument: req.file?.filename
        };

        const data = (await ProductEntryService.saveProductStock(inputs)) as IProductEntry;
        res
          .status(201)
          .json({ success: 'Cadastro feito  com sucesso', stockId: data?._id });
      
    } catch (error) {
      console.log("Dados", error);
      console.log(error);
      res.status(500).send({ message: error });
    }
  }

  public async updateProductEntry(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const productEntry = (await ProductEntryService.updateProductStock(productId, req.body)) as IProductEntry;
      res.status(204).json({
        message: 'As suas informações foram actualizadas com sucesso',
        productEntry,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Aconteceu um erro ao atualizada', error });
    }
  }

  public async updateProductEntryWithProfile(req: Request, res: Response): Promise<Response> {
    try {
      const {productId } = req.params;
      console.log(req.file?.filename)
      const inputs = {
        invoiceDocument: req.file?.filename,
        ...req.body,
      };
    console.log(req.body)
      const productEntryFinded = (await ProductEntryService.findOneProductStock(productId)) as IProductEntry;
      if (productEntryFinded) {
        const resultDelete = await deleteFileDocDataBase('stock', productEntryFinded?.invoiceDocument);
        if (resultDelete) {
          const productEntry = (await ProductEntryService.updateProductStock(productId, inputs)) as any;
          return res.status(204).json({
            message: 'As suas informações foram actualizadas com sucesso',
            productEntry,
          });
        }
      }
      return res
        .status(500)
        .json({ message: 'Ocorreu um erro ao atualizar os dados' });

    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Ocorreu um erro ao atualizar os dados', error });
    }

  }

  public async deleteProductEntry(req: Request, res: Response): Promise<Response> {
    try {
      const { productId } = req.params;

      const productEntryFinded = (await ProductEntryService.findOneProductStock(productId)) as IProductEntry;

      if (productEntryFinded) {
        const resultDelete = await deleteFileDocDataBase('stock', productEntryFinded?.invoiceDocument);
        if (resultDelete) {
          const ProductEntry = (await ProductEntryService.deleteProductStock(productId)) as IProductEntry;;
          return res.status(204).json({
            message: 'As suas informações foram deletadas com sucesso',
            ProductEntry,
          });
        }
      }
      return res
        .status(500)
        .json({ message: 'Aconteceu um erro ao deletar os dados do stock' });
    } catch (error) {
      return res.status(404).send(error);
    }
  }
}

export default new StockController();
