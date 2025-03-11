import { Request, Response } from 'express';
import {
  fetchAllDataCategory,
  responseDataCategory,
} from '../../util/dataFetching/category';
import { Category } from '../model/Category';
import { ICategory } from '../../interfaces/generoInterface';

class ProdutoCategoryController {
  public async listAllCategory(req: Request, res: Response): Promise<void> {
    const { limit = 25, page } = req.query;
    try {
      const category = await Category.find({active: true})
        .limit(Number(limit))
        .skip(Number(page))
        .sort({ createdAt: -1 });
      const allDataUser = await fetchAllDataCategory(category);
      const responseData = responseDataCategory(allDataUser, Number(0));

      res.status(200).send(responseData);
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async listOneCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.params;
      const category = (await Category.findById(categoryId)) as ICategory;
      if (category) {
        res.status(200).send(category);
      } else {
        res
          .status(404)
          .send({ message: 'Não foi encontrada nenhuma categoria.' });
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async saveCategory(req: Request, res: Response): Promise<void> {
    try {
      const category = await Category.find({
        $or: [{ categoryName: req.body.categoryName }],
      });
      if (category.length > 0) {
        res
          .status(409)
          .json({ error: 'Essa categoria já existe. Experimente outro' });
      } else {
        const data = await Category.create(req.body);

        const dataCategory = {
          categoryName: data.categoryName,
          id: data._id,
        };
        res
          .status(201)
          .json({ success: 'Cadastro feito  com sucesso', ...dataCategory });
      }
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }

  public async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const { categoryId } = req.params;
      const category = await Category.findByIdAndUpdate(
        { _id: categoryId },
        { $set: data },
        { new: false }
      );
      res.status(204).json({
        message: 'As suas informações foram actualizadas com sucesso',
        category,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Aconteceu um erro ao atualizada', error });
    }
  }

  public async deleteCategory(req: Request, res: Response): Promise<Response> {
    try {
      const { categoryId } = req.params;
      const category = await Category.findByIdAndDelete(categoryId);
      if (category) {
        return res.status(204).send('Deletado com sucesso');
      }
      return res.status(404).send(category);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
}

export default new ProdutoCategoryController();
