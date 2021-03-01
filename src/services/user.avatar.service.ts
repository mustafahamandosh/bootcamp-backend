import { getRepository, Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import User from '../models/User';
import upload from '../config/upload';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  filename: string;
}

class UserAvatarService {
  private userRepository: Repository<User>;

  public async execute({ user_id, filename }: Request): Promise<User> {
    this.userRepository = getRepository(User);

    const user = await this.userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      // delete old avatar
      const userAvatarFilePath = path.join(upload.directory, user.avatar);

      const isUserAvatarExist = await fs.promises.stat(userAvatarFilePath);

      if (isUserAvatarExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = filename;

    await this.userRepository.save(user);

    return user;
  }
}

export default UserAvatarService;
