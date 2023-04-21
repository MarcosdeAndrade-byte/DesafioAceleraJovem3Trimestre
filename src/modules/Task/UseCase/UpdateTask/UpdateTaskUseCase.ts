import { inject, injectable } from 'tsyringe';
import { adjustDateForLocalTimezone } from '../../../../shared/provider/DateProvider/DateProvider';
import { ITaskRepository } from '../../Infra/MongoDB/ITaskRepository';
import { AppError } from '../../../../shared/Errors/AppError';

@injectable()
class UpdatedTaskUseCase {
  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository
  ) {}

  async execute(
    userId: string,
    taskId: string,
    title: string,
    description: string,
    done: boolean
  ): Promise<void> {
    const checkIfTaskExists = await this.taskRepository.findTaskById(taskId);

    if (checkIfTaskExists.length === 0) {
      throw new AppError('Task não encontrada no sistema!', 400);
    }

    const { updated_at } = adjustDateForLocalTimezone(new Date());
    await this.taskRepository.updatedTask(
      userId,
      taskId,
      title,
      description,
      done,
      updated_at
    );
  }
}

export { UpdatedTaskUseCase };
