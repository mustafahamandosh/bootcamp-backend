import { getRepository, Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authentication from '../config/authentication';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class SessionService {
  private userRepository: Repository<User>;

  public async execute({ email, password }: Request): Promise<Response> {
    this.userRepository = getRepository(User);

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect email or password', 401);
    }

    // user.password - senha criptografia
    // password - senha não criptografia
    const isPasswordMatched = await compare(password, <string>user.password);

    if (!isPasswordMatched) {
      throw new AppError('Incorrect email or password', 401);
    }

    const { secretKey, expiresIn } = authentication.jwt;

    const token = sign({}, secretKey, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}
