import 'reflect-metadata';
import { InMemoryUsersRepository } from '../../Infra/in-memory/UserRepositoryInMemory';
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { LoginUserUseCase } from '../login/LoginUserUseCase';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';
import { AppError } from '../../../../shared/Errors/AppError';
import { JsonWebTokenError } from 'jsonwebtoken';

let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let loginUserUseCase: LoginUserUseCase;
let refreshTokenUseCase: RefreshTokenUseCase;

describe('RefreshTokenUseCase', () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    loginUserUseCase = new LoginUserUseCase(usersRepositoryInMemory);
    refreshTokenUseCase = new RefreshTokenUseCase(usersRepositoryInMemory);
  });

  it('should be create a refresh token', async () => {
    await createUserUseCase.execute(
      'John Doe',
      'john.alabama@hotmail.com',
      '123456'
    );

    const userDataLogin = await loginUserUseCase.execute(
      'john.alabama@hotmail.com',
      '123456'
    );

    const newRefreshTokenAndToken = await refreshTokenUseCase.execute(
      userDataLogin.user.refreshToken[0] as unknown as string
    );

    expect(newRefreshTokenAndToken).toHaveProperty('token');
    expect(newRefreshTokenAndToken).toHaveProperty('refresh_token');
  });

  it('should not be create a refresh token', async () => {
    await expect(refreshTokenUseCase.execute('teste')).rejects.toBeInstanceOf(
      JsonWebTokenError
    );
  });
});
