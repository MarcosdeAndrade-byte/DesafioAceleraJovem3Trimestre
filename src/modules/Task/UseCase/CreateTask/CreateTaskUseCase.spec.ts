import 'reflect-metadata';
import { InMemoryUsersRepository } from '../../../User/Infra/in-memory/UserRepositoryInMemory';
import { TaskRepositoryInMemory } from '../../Infra/MongoDB/in-memory/TaskRepositoryInMemory';
import { CreateTaskUseCase } from './CreateTaskUseCase';
import { Task } from '../../Entities/Task';
import { AppError } from '../../../../shared/Errors/AppError';

let createTaskUseCase: CreateTaskUseCase;
let taskRepositoryInMemory: TaskRepositoryInMemory;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe('CreateTaskUseCase', () => {
  beforeAll(async () => {
    taskRepositoryInMemory = new TaskRepositoryInMemory();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createTaskUseCase = new CreateTaskUseCase(
      taskRepositoryInMemory,
      inMemoryUsersRepository
    );
  });

  it('should be create a new task', async () => {
    await inMemoryUsersRepository.createUser(
      'John Doe',
      'email@teste.com',
      '123456'
    );

    await createTaskUseCase.execute('1', 'title', 'description', false);
    const [task] = await taskRepositoryInMemory.findTasksByTitleOrStatus(
      '1',
      'title',
      false
    );

    expect(task).toBeInstanceOf(Task);
    expect(task.title).toBe('title');
    expect(task.description).toBe('description');
  });
});

it('it should not be possible to register a task with an invalid id', async () => {
  await expect(
    createTaskUseCase.execute('id invalido', 'title', 'description', false)
  ).rejects.toBeInstanceOf(AppError);
});
