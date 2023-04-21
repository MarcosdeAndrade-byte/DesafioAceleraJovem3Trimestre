import { inject, injectable } from 'tsyringe';
import { adjustDateForLocalTimezone } from '../../../../shared/provider/DateProvider/DateProvider';
import { ITaskRepository } from '../../Infra/MongoDB/ITaskRepository';
import { IUserRepository } from '../../../User/Infra/MongoDB/IUserRepository';
import { AppError } from '../../../../shared/Errors/AppError';

@injectable()
class CreateTaskUseCase {
  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(
    userId: string,
    title: string,
    description: string,
    done: boolean,
    _id?: string
  ): Promise<void> {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const { created_at, updated_at } = adjustDateForLocalTimezone(new Date());

    this.taskRepository.createTask(
      userId,
      title,
      description,
      done,
      created_at,
      updated_at,
      _id
    );
  }
}

export { CreateTaskUseCase };
