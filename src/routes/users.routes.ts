import { Router } from 'express';
import multer from 'multer';
import UserService from '../services/user.service';
import isAuthenticated from '../middlewares/isAuthenticated';
import upload from '../config/upload';
import UserAvatarService from '../services/user.avatar.service';

const usersRouters = Router();
const uploadConfig = multer(upload);

usersRouters.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUserService = new UserService();

  const user = await createUserService.execute({ name, email, password });

  delete user.password;

  return res.json(user);
});

usersRouters.patch(
  '/avatar',
  isAuthenticated,
  uploadConfig.single('avatar'),
  async (req, res) => {
    const userAvatar = new UserAvatarService();

    const { id } = req.user;

    const user = await userAvatar.execute({
      user_id: id,
      filename: req.file.filename,
    });

    delete user.password;

    return res.json(user);
  },
);

export default usersRouters;
