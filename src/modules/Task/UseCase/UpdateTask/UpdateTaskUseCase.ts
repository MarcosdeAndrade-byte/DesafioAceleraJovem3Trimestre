import { inject, injectable } from 'tsyringe';
import { ITaskRepository } from '../../Infra/MongoDB/ITaskRepository';

@injectable()
class UpdatedTaskUseCase {
    constructor(
        @inject('TaskRepository')
        private taskRepository: ITaskRepository
    ) {}

    async execute(userId: string, taskId: string, title: string, description: string, done: boolean): Promise<void> {
        await this.taskRepository.updatedTask(userId, taskId, title, description, done);
    }
}

export { UpdatedTaskUseCase };