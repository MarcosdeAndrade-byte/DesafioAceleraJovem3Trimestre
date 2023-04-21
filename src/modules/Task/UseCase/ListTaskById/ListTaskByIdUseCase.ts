import { inject, injectable } from 'tsyringe';
import { Task } from '../../Entities/Task';
import { ITaskRepository } from '../../Infra/MongoDB/ITaskRepository';
import { AppError } from '../../../../shared/Errors/AppError';

@injectable()
class ListTaskByIdUseCase {
  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository
  ) {}

  async execute(userId: string): Promise<Task> {
    const checkIfTaskExists = await this.taskRepository.findTaskById(userId);

    if (checkIfTaskExists.length === 0) {
      throw new AppError('Task não encontrada no sistema!');
    }

    const task = await this.taskRepository.listTaskById(userId);

    return task;
  }
}

export { ListTaskByIdUseCase };
