import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authentication from '../config/authentication';
import AppError from '../errors/AppError';

interface Payload {
  iat: number;
  exp: number;
  sub: string;
}

const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError('JWT token is missing', 403);
  }

  const [, token] = authorization.split(' ');

  const { secretKey } = authentication.jwt;

  const decoded = verify(token, secretKey);

  const { sub: subject } = decoded as Payload;

  req.user = {
    id: subject,
  };

  return next();
};

export default isAuthenticated;
