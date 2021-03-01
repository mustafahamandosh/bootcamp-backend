import { getRepository, Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class UserService {
  private userRepository: Repository<User>;

  public async execute({ name, email, password }: Request): Promise<User> {
    this.userRepository = getRepository(User);

    const isUserExist = await this.userRepository.findOne({ where: { email } });

    if (isUserExist) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    return user;
  }
}

export default UserService;
