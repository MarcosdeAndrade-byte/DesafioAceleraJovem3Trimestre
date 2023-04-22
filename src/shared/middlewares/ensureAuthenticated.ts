import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRepository } from '../../modules/User/Infra/MongoDB/Repository/UserRepository';
import { AppError } from '../Errors/AppError';

interface ITokenProperties {
  email: string;
  sub: string;
}

// middleware para autenticação das rotas
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
      throw new AppError('Token missing', 400);
    }

    const [, token] = authHeader.split(' ');

    const { email, sub } = verify(token, 'SEGREDO') as ITokenProperties;

    const userRepository = new UserRepository();
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError('Token inválido', 400);
    }

    request.user = {
      userId: sub,
      email: email,
    };

    next();
  } catch (error) {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json(error.message);
    }

    return response.status(400).json(error);
  }
}
