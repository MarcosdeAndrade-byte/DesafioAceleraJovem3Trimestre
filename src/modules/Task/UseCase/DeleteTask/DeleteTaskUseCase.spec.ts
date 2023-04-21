import 'reflect-metadata';
import { InMemoryUsersRepository } from '../../../User/Infra/in-memory/UserRepositoryInMemory';
import { TaskRepositoryInMemory } from '../../Infra/MongoDB/in-memory/TaskRepositoryInMemory';
import { CreateTaskUseCase } from '../CreateTask/CreateTaskUseCase';
import { DeleteTaskUseCase } from './DeleteTaskUseCase';
import { AppError } from '../../../../shared/Errors/AppError';

let createTaskUseCase: CreateTaskUseCase;
let deleteTaskUseCase: DeleteTaskUseCase;
let taskRepositoryInMemory: TaskRepositoryInMemory;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe('DeleteTaskUseCase', () => {
  beforeAll(async () => {
    taskRepositoryInMemory = new TaskRepositoryInMemory();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    deleteTaskUseCase = new DeleteTaskUseCase(taskRepositoryInMemory);
    createTaskUseCase = new CreateTaskUseCase(
      taskRepositoryInMemory,
      inMemoryUsersRepository
    );
  });

  it('It should be possible to delete a Task', async () => {
    await inMemoryUsersRepository.createUser(
      'John Doe',
      'email@teste.com',
      '123456'
    );

    await createTaskUseCase.execute('1', 'title', 'description', false, '321');

    expect(await deleteTaskUseCase.execute('321', '1')).not.toBeInstanceOf(
      AppError
    );
  });

  it('It should not be possible to delete a Task with an invalid id', async () => {
    await inMemoryUsersRepository.createUser(
      'John Doe',
      'email@teste.com',
      '123456'
    );

    await createTaskUseCase.execute('1', 'title', 'description', false);

    await expect(
      deleteTaskUseCase.execute('task id invalido', 'user id invalido')
    ).rejects.toBeInstanceOf(AppError);
  });
});
