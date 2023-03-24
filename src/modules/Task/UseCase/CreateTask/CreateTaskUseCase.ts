import { inject, injectable } from 'tsyringe';
import { ITaskRepository } from '../../Infra/MongoDB/ITaskRepository';

@injectable()
class CreateTaskUseCase {
    constructor(
        @inject('TaskRepository')
        private taskRepository: ITaskRepository
    ) {}

    async execute(title: string, description: string, done: boolean, created_at: Date, updated_at: Date): Promise<void> {
        this.taskRepository.createTask(title, description, done, created_at, updated_at);
    }
}

export { CreateTaskUseCase };