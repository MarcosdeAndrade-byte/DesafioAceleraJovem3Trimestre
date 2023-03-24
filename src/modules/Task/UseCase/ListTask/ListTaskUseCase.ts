import { inject, injectable } from 'tsyringe';
import { Task } from '../../Entities/Task';
import { ITaskRepository } from '../../Infra/MongoDB/ITaskRepository';

@injectable()
class ListTaskUseCase {
    constructor(
        @inject('TaskRepository')
        private taskRepository: ITaskRepository
    ) {}

    async execute(userId: string, title: string): Promise<Task[]> {
        const tasks = await this.taskRepository.listTask(userId,title);
        return tasks;
    }
}

export { ListTaskUseCase };