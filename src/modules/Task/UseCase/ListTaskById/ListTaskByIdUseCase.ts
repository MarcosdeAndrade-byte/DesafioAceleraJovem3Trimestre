import { inject, injectable } from 'tsyringe';
import { Task } from '../../Entities/Task';
import { ITaskRepository } from '../../Infra/MongoDB/ITaskRepository';

@injectable()
class ListTaskByIdUseCase {
    constructor(
        @inject('TaskRepository')
        private taskRepository: ITaskRepository
    ) {}

    async execute(userId: string): Promise<Task> {
        const tasks = await this.taskRepository.listTaskById(userId);

        if(!tasks) {
            throw new Error('Task não encontrada!');
        }

        return tasks;
    }
}

export { ListTaskByIdUseCase };