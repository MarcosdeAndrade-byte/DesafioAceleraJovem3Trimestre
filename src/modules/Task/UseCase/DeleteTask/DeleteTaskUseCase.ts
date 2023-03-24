import { inject, injectable } from 'tsyringe';
import { ITaskRepository } from '../../Infra/MongoDB/ITaskRepository';

@injectable()
class DeleteTaskUseCase {
    constructor(
        @inject('TaskRepository')
        private taskRepository: ITaskRepository
    ) {}

    async execute(taskId: string, userId: string): Promise<void> {
        this.taskRepository.deleteTaskById(taskId, userId);
    }
}

export { DeleteTaskUseCase };