import { inject, injectable } from 'tsyringe';
import { ITaskRepository } from '../../Infra/MongoDB/ITaskRepository';

@injectable()
class DeleteTaskUseCase {
    constructor(
        @inject('TaskRepository')
        private taskRepository: ITaskRepository
    ) {}

    async execute(taskId: string, userId: string): Promise<void> {
        const verificationTasExist = this.taskRepository.findTaskById(taskId);

        if(!verificationTasExist) {
            throw new Error('A task não foi encontrada no sistema!');
        }

        this.taskRepository.deleteTaskById(taskId, userId);
    }
}

export { DeleteTaskUseCase };