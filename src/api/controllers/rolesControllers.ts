import { Request, Response } from 'express';
import { fetchAllDataRole, responseDataRole } from '../../util/dataFetching/role';
import { Role } from '../model/Access_Level';
class UserController {


  public async listRoles(req: Request, res: Response): Promise<void> {
    const { limit, page } = req.query;
    try {
      const users = await Role.find({})
        .limit(Number(limit))
        .skip(Number(page));
	  if (!limit || !page) {
	  const allDataUser = await fetchAllDataRole(users);
	  const responseData = responseDataRole(allDataUser, Number(page));
	  res.status(200).send(responseData);
	  } else {
        const allDataUser = await fetchAllDataRole(users);
        const responseData = responseDataRole(allDataUser, Number(0));
        res.status(200).send(responseData);
	  }
    } catch (error) {
      res.status(404).send(error);
    }
  }

  public async listOne(req: Request, res: Response): Promise<void> {
    try {
      const { roleId } = req.params;
      const role = await Role.findById(roleId);
      if (role) {
        res.status(200).send(role);
      } else {
        res
          .status(404)
          .send({ message: 'Não foi encontrada nenhuma de permissões.' });
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }


  public async saveRoles(req: Request, res: Response): Promise<Response> {
    try {
		     const { level,  role } = req.body;
      const resultRole = await Role.find({ level:level,  role: role });
      if (resultRole.length > 0) {
        return res.status(409).json({ message: 'O nivel de acesso já existe' });
      }
      const roles = await Role.create(req.body);
      return res.send(roles);
    } catch (error) {
      return res.status(200).json({ message: 'Aconteceu um erro ao cadastrar', error });
    }
  }

  public async updateRole(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const { roleId } = req.params;
      const user = await Role.findByIdAndUpdate(
        { _id: roleId },
        { $set: data },
        { new: false },
      );
      res.status(204).json({
        message: 'Informações actualizada com sucesso',
        user,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Aconteceu um erro ao atualizar', error });
    }
  }

  
  public async deleteRole(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const user = await Role.findByIdAndDelete(userId);
      if (user) {
        return res.status(204).send('Deletado com sucesso');
      }
      return res.status(404).send(user);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
}



export default new UserController();