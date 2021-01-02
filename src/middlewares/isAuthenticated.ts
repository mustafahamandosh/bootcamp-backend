import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authentication from '../config/authentication';

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
    throw new Error('JWT token is missing');
  }

  const [, token] = authorization.split(' ');

  const { secretKey } = authentication.jwt;

  try {
    const decoded = verify(token, secretKey);

    const { sub: subject } = decoded as Payload;

    req.user = {
      id: subject,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
};

export default isAuthenticated;
