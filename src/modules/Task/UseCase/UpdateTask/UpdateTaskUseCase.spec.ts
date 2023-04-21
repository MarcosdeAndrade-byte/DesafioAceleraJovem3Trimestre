import 'reflect-metadata';
import { InMemoryUsersRepository } from '../../../User/Infra/in-memory/UserRepositoryInMemory';
import { TaskRepositoryInMemory } from '../../Infra/MongoDB/in-memory/TaskRepositoryInMemory';
import { CreateTaskUseCase } from '../CreateTask/CreateTaskUseCase';
import { UpdatedTaskUseCase } from './UpdateTaskUseCase';
import { AppError } from '../../../../shared/Errors/AppError';

let taskRepositoryInMemory: TaskRepositoryInMemory;
let userRepositoryInMemory: InMemoryUsersRepository;
let createTaskUseCase: CreateTaskUseCase;
let updateTaskUseCase: UpdatedTaskUseCase;

describe('UpdateTaskUseCase', () => {
  beforeAll(async () => {
    taskRepositoryInMemory = new TaskRepositoryInMemory();
    userRepositoryInMemory = new InMemoryUsersRepository();
    createTaskUseCase = new CreateTaskUseCase(
      taskRepositoryInMemory,
      userRepositoryInMemory
    );
    updateTaskUseCase = new UpdatedTaskUseCase(taskRepositoryInMemory);
  });

  it('should be able to update a task', async () => {
    await userRepositoryInMemory.createUser(
      'John Doe',
      'johnDoe@hotmail.com',
      '123'
    );

    await createTaskUseCase.execute(
      '1',
      'Task 1 title',
      'Task 1 description',
      false,
      '654'
    );

    await updateTaskUseCase.execute(
      '1',
      '654',
      'Task change update title',
      'Task change update description',
      true
    );

    const task = await taskRepositoryInMemory.findTaskById('654');

    expect(task[0].title).toBe('Task change update title');
    expect(task[0].description).toBe('Task change update description');
    expect(task[0].done).toBe(true);
  });

  it('should not be able to update a task with a non-existent user', async () => {
    await userRepositoryInMemory.createUser(
      'John Doe',
      'johnDoe@hotmail.com',
      '123'
    );

    await createTaskUseCase.execute(
      '1',
      'Task 1 title',
      'Task 1 description',
      false,
      '654'
    );

    await expect(
      updateTaskUseCase.execute(
        '1',
        '000',
        'Task change update title',
        'Task change update description',
        true
      )
    ).rejects.toBeInstanceOf(AppError);
  });
});
