import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRepository } from '../../modules/User/Infra/MongoDB/Repository/UserRepository';

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

    if (!authHeader) {
      throw new Error('Token missing');
    }

    const [, token] = authHeader.split(' ');

    const { email, sub } = verify(token, 'SEGREDO') as ITokenProperties;

    const userRepository = new UserRepository();
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error('Token inválido');
    }

    request.user = {
      userId: sub,
      email: email,
    };
  } catch (error) {
    return response.status(400).json(error);
  }

  next();
}
