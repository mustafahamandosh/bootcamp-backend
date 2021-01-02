import { Router } from 'express';
import UserService from '../services/user.service';
import isAuthenticated from '../middlewares/isAuthenticated';

const usersRouters = Router();

usersRouters.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUserService = new UserService();

    const user = await createUserService.execute({ name, email, password });

    delete user.password;

    return res.json(user);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

usersRouters.patch('/avatar', isAuthenticated, async (req, res) => {
  return res.json({ ok: true });
});

export default usersRouters;
