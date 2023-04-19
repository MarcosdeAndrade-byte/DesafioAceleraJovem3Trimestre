import { inject, injectable } from 'tsyringe';
import { adjustDateForLocalTimezone } from '../../../../shared/provider/DateProvider/DateProvider';
import { ITaskRepository } from '../../Infra/MongoDB/ITaskRepository';

@injectable()
class CreateTaskUseCase {
  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository
  ) {}

  async execute(
    userId: string,
    title: string,
    description: string,
    done: boolean
  ): Promise<void> {
    const { created_at, updated_at } = adjustDateForLocalTimezone(new Date());

    this.taskRepository.createTask(
      userId,
      title,
      description,
      done,
      created_at,
      updated_at
    );
  }
}

export { CreateTaskUseCase };
