import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { ensureAuthenticated } from './ensureAuthenticated';
import { InMemoryUsersRepository } from '../../modules/User/Infra/in-memory/UserRepositoryInMemory';
import { CreateUserUseCase } from '../../modules/User/UseCase/CreateUser/CreateUserUseCase';
import { AppError } from '../Errors/AppError';

jest.mock(
  'jsonwebtoken',
  () => {
    return {
      verify: jest.fn().mockImplementation(() => {
        return {
          sub: '1',
          email: 'email@teste.com',
        };
      }),
    };
  },
  { virtual: true }
);

jest.mock('../../modules/User/Infra/MongoDB/Repository/UserRepository', () => {
  return {
    UserRepository: jest.fn().mockImplementation(() => {
      return {
        findUserByEmail: jest.fn().mockImplementation(() => {
          return {
            id: '1',
            name: 'John Doe',
            email: 'email@teste.com',
          };
        }),
      };
    }),
  };
});

let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('ensureAuthenticated', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to authenticate a user', async () => {
    await createUserUseCase.execute('John Doe', 'email@teste.com', '123456');

    const req = {
      headers: {
        authorization: 'Bearer token',
      },
      user: {},
    } as Request;

    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    await ensureAuthenticated(req, res, next);

    expect(req.user).toEqual({ email: 'email@teste.com', userId: '1' });
  });

  it('It must not be possible to authenticate a user who did not send the token', async () => {
    await createUserUseCase.execute('John Doe', 'email@teste.com', '123456');

    const req = {
      headers: {
        authorization: null,
      },
    } as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    try {
      await ensureAuthenticated(req, res, next);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it('It must not be possible to authenticate a user who sent an invalid token', async () => {
    jest.mock(
      '../../modules/User/Infra/MongoDB/Repository/UserRepository',
      () => {
        return {
          UserRepository: jest.fn().mockImplementation(() => {
            return {
              findUserByEmail: jest.fn().mockImplementation(() => {
                return null;
              }),
            };
          }),
        };
      }
    );

    await createUserUseCase.execute('John Doe', 'email@teste.com', '123456');

    const req = {
      headers: {
        authorization: 'Bearer token',
      },
      user: {},
    } as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    await ensureAuthenticated(req, res, next);

    const result = await ensureAuthenticated(req, res, next);

    expect(result).toBeUndefined();
    expect(next).toHaveBeenCalled();
  });
});
