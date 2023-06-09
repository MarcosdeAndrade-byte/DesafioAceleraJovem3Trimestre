import { inject, injectable } from 'tsyringe';
import { ITaskRepository } from '../../Infra/MongoDB/ITaskRepository';
import { AppError } from '../../../../shared/Errors/AppError';

@injectable()
class DeleteTaskUseCase {
  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository
  ) {}

  async execute(taskId: string, userId: string): Promise<void> {
    const verificationTasExist = await this.taskRepository.findTaskById(taskId);

    if (verificationTasExist.length === 0) {
      throw new AppError('Task não encontrada no sistema!', 400);
    }

    await this.taskRepository.deleteTaskById(taskId, userId);
  }
}

export { DeleteTaskUseCase };
