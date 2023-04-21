import 'reflect-metadata';
import { AppError } from '../../../../shared/Errors/AppError';
import { InMemoryUsersRepository } from '../../../User/Infra/in-memory/UserRepositoryInMemory';
import { TaskRepositoryInMemory } from '../../Infra/MongoDB/in-memory/TaskRepositoryInMemory';
import { CreateTaskUseCase } from '../CreateTask/CreateTaskUseCase';
import { ListTaskByIdUseCase } from './ListTaskByIdUseCase';

let createTaskUseCase: CreateTaskUseCase;
let listTaskByIdUseCase: ListTaskByIdUseCase;
let taskRepositoryInMemory: TaskRepositoryInMemory;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe('ListTaskByIdUseCase', () => {
  beforeAll(async () => {
    taskRepositoryInMemory = new TaskRepositoryInMemory();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    listTaskByIdUseCase = new ListTaskByIdUseCase(taskRepositoryInMemory);
    createTaskUseCase = new CreateTaskUseCase(
      taskRepositoryInMemory,
      inMemoryUsersRepository
    );
  });

  it('It should be possible to list a Task by id', async () => {
    await inMemoryUsersRepository.createUser(
      'John Doe',
      'email@teste.com',
      '123456'
    );

    await taskRepositoryInMemory.createTask(
      '1',
      'Mike baguncinha',
      'Salvar capitão Nascimento',
      true,
      new Date(),
      new Date(),
      '123'
    );

    const task = await listTaskByIdUseCase.execute('123');

    expect(task).toHaveProperty('_id');
    expect(task).toHaveProperty('title');
    expect(task).toHaveProperty('description');
    expect(task).toHaveProperty('done');
    expect(task).toHaveProperty('created_at');
    expect(task).toHaveProperty('updated_at');
    expect(task).toHaveProperty('userId');
  });

  it('It should not be possible to list a non-existing task', async () => {
    await expect(
      listTaskByIdUseCase.execute('id indefinido')
    ).rejects.toBeInstanceOf(AppError);
  });
});
