import 'reflect-metadata';
import { InMemoryUsersRepository } from '../../Infra/in-memory/UserRepositoryInMemory';
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { LoginUserUseCase } from './LoginUserUseCase';
import { AppError } from '../../../../shared/Errors/AppError';

let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let loginUserUseCase: LoginUserUseCase;

describe('LoginUserUseCase', () => {
  beforeAll(async () => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    loginUserUseCase = new LoginUserUseCase(usersRepositoryInMemory);
  });

  it('should login user', async () => {
    await createUserUseCase.execute(
      'John Doe',
      'john.alabama@hotmail.com',
      '123456'
    );

    const userDataLogin = await loginUserUseCase.execute(
      'john.alabama@hotmail.com',
      '123456'
    );

    expect(userDataLogin).toHaveProperty('token');
    expect(userDataLogin.user).toHaveProperty('name');
    expect(userDataLogin.user).toHaveProperty('email');
    expect(userDataLogin.user).toHaveProperty('password');
  });

  it('should not login user with wrong email', async () => {
    await expect(
      loginUserUseCase.execute('john.alabama@hotmail', '123456')
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not login user with wrong password', async () => {
    await expect(
      loginUserUseCase.execute('john.alabama@hotmail.com', 'senha invalida')
    ).rejects.toBeInstanceOf(AppError);
  });
});
