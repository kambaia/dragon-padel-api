import { Request, Response } from 'express';
import {
  fetchAllDataUser,
  responseDataUser,
} from '../../util/dataFetching/user';
import AuthService from '../services/auth';

import UserService from '../services/user';

import { hash } from 'bcrypt';
import { ISearch } from '../../interfaces/app/search';
import { deleteFileImageDataBase } from '../../util/deleteFile';
import { IUser } from '../../interfaces/UserInterface';

class UserController {
  public async listAllUser(req: Request, res: Response): Promise<void> {
    const { limit = 25, page = 0 } = req.query as unknown as ISearch;
    try {

      const user = (await UserService.findAllUser({ limit, page })) as any;
      const allDataUser = await fetchAllDataUser(user);

      const responseData = responseDataUser(allDataUser, Number(0));

      res.status(200).send(responseData);

    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async listOneUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      if (userId) {
        const user = (await UserService.findOneUser(userId)) as any;
        if (user) {
          res.status(200).send(user);
        } else {
          res
            .status(404)
            .send({ message: 'Não foi encontrada nenhuma usúario.' });
        }
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async saveUser(req: Request, res: Response): Promise<void> {
    try {
      const user = (await AuthService.authLogin(req.body.email)) as any;

      if (user) {
        res
          .status(409)
          .json({ error: 'Esse nome de usuário já existe. Experimente outro' });
      } else {
        const newpassword = await hash(req.body.password, 8);

        req.body.password = newpassword;

        const inputs = {
          ...req.body,
          permission: [ 'admin' ],
        };
        const data = (await UserService.saveUser(inputs)) as any;
        const userdata = {
          profile: data.profile,
          fullName: data.fullName,
          id: data._id,
        };
        res
          .status(201)
          .json({ success: 'Cadastro feito  com sucesso', ...userdata });
      }
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const user = (await UserService.updateUser(userId, req.body)) as any;
      res.status(204).json({
        message: 'As suas informações foram actualizadas com sucesso',
        user,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Aconteceu um erro ao atualizada', error });
    }
  }

  public async updateUserWithProfile(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;

      const inputs = {
        profile: {
          thumbnail: req.file?.filename,
          name: req.file?.originalname,
        },
        ...req.body,
      };
      const userFinded = (await UserService.findOneUser(userId)) as IUser;
      if (userFinded) {
        const resultDelete = await deleteFileImageDataBase('user', userFinded?.profile.thumbnail);
        if (resultDelete) {
          const user = (await UserService.updateUser(userId, inputs)) as any;
          return res.status(204).json({
            message: 'As suas informações foram actualizadas com sucesso',
            user,
          });
        }
      }
      return res
        .status(500)
        .json({ message: 'Aconteceu um erro ao atualizada' });

    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Aconteceu um erro ao atualizada', error });
    }

  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const userFinded = (await UserService.findOneUser(userId)) as IUser;
      if (userFinded) {
        const resultDelete = await deleteFileImageDataBase('user', userFinded?.profile.thumbnail);
        if (resultDelete) {
          const user = (await UserService.deleteUser(userId)) as any;
          return res.status(204).json({
            message: 'As suas informações foram deleter com sucesso',
            user,
          });
        }
      }
      return res
        .status(500)
        .json({ message: 'Aconteceu um erro ao deleter o usuário' });
    } catch (error) {
      return res.status(404).send(error);
    }
  }
}

export default new UserController();
