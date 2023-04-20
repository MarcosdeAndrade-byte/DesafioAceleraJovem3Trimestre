import 'reflect-metadata';
import { CreateUserUseCase } from './CreateUserUseCase';
import { InMemoryUsersRepository } from '../../../../modules/User/Infra/in-memory/UserRepositoryInMemory';
import { describe, beforeAll, it } from '@jest/globals';
import { AppError } from '../../../../shared/Errors/AppError';

let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('CreateUserUseCase', () => {
  beforeAll(async () => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should create user', async () => {
    await createUserUseCase.execute('John Doe', 'email@teste.com', '123456');

    const user = await usersRepositoryInMemory.findUserByEmail(
      'email@teste.com'
    );

    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('email@teste.com');
  });

  it('should not create user with same email', async () => {
    await expect(
      createUserUseCase.execute('John Doe', 'email@teste.com', '123456')
    ).rejects.toBeInstanceOf(AppError);
  });
});
