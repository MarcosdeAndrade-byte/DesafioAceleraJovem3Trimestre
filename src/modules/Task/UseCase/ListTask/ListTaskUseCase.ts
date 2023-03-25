import { inject, injectable } from 'tsyringe';
import { Task } from '../../Entities/Task';
import { ITaskRepository } from '../../Infra/MongoDB/ITaskRepository';

@injectable()
class ListTaskUseCase {
    constructor(
        @inject('TaskRepository')
        private taskRepository: ITaskRepository
    ) {}

    async execute(userId: string, title: string, done: boolean): Promise<Task[]> {
        const tasks = await this.taskRepository.findTasksByTitleOrStatus(userId,title,done);

        if(tasks.length === 0) {
            throw new Error('Task não encontrada!');
        }

        return tasks;
    }
}

export { ListTaskUseCase };