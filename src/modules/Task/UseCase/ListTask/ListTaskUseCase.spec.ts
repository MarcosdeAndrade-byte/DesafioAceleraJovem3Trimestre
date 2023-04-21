import 'reflect-metadata';
import { InMemoryUsersRepository } from '../../../User/Infra/in-memory/UserRepositoryInMemory';
import { TaskRepositoryInMemory } from '../../Infra/MongoDB/in-memory/TaskRepositoryInMemory';
import { CreateTaskUseCase } from '../CreateTask/CreateTaskUseCase';
import { ListTaskUseCase } from './ListTaskUseCase';
import { AppError } from '../../../../shared/Errors/AppError';

let createTaskUseCase: CreateTaskUseCase;
let listTaskUseCase: ListTaskUseCase;
let taskRepositoryInMemory: TaskRepositoryInMemory;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe('ListTaskUseCase', () => {
  beforeAll(async () => {
    taskRepositoryInMemory = new TaskRepositoryInMemory();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    listTaskUseCase = new ListTaskUseCase(taskRepositoryInMemory);
    createTaskUseCase = new CreateTaskUseCase(
      taskRepositoryInMemory,
      inMemoryUsersRepository
    );
  });

  it('It should be possible to list all Tasks', async () => {
    await inMemoryUsersRepository.createUser(
      'John Doe',
      'email@teste.com',
      '123456'
    );

    await createTaskUseCase.execute('1', 'title', 'description', true);
    await createTaskUseCase.execute('1', 'title teste', 'description', true);
    const tasks = await listTaskUseCase.execute('1', 'title', true);

    expect(tasks.length).toBe(2);
  });

  it('It should not be possible to list a non-existing task', async () => {
    await expect(
      listTaskUseCase.execute('id indefinido', 'titulo indefinido', true)
    ).rejects.toBeInstanceOf(AppError);
  });
});
