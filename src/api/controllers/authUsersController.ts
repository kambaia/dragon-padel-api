import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { authToke } from '../../util/auth';
import AuthService from '../services/auth';
import { fetchAllDataUser } from '../../util/dataFetching/user-access';

class authUsersController {
  public async auth(req: Request, res: Response): Promise<Response> {
    console.log(req.body)
    try {
      const { email, password } = req.body;
      const user = (await AuthService.authLogin(email)) as any;
   
      if (!user)
        return res
          .status(404)
          .json({ message: 'E-mail ou  palavra pass incorreta' });
      if (!(await bcrypt.compare(password, user.password!))) {
        return res
          .status(400)
          .json({ message: 'E-mail ou  palavra pass incorreta' });
      } else {
        user.password! = undefined;
        const acess = await fetchAllDataUser(user);
        const token = authToke(user._id.toString());
        console.log(user)
        return res.json({ acess, token });
      }
    } catch (error) {
      return res
        .status(400)
        .json({ message: 'Usuário inválido', error: error });
    }
  }
}
export default new authUsersController();
