import { inject, injectable } from 'tsyringe';
import { Task } from '../../Entities/Task';
import { ITaskRepository } from '../../Infra/MongoDB/ITaskRepository';
import { AppError } from '../../../../shared/Errors/AppError';

@injectable()
class ListTaskUseCase {
  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository
  ) {}

  async execute(userId: string, title: string, done: boolean): Promise<Task[]> {
    const tasks = await this.taskRepository.findTasksByTitleOrStatus(
      userId,
      title,
      done
    );

    if (tasks.length === 0) {
      throw new AppError('Task não encontrada!', 400);
    }

    return tasks;
  }
}

export { ListTaskUseCase };
