import { Task } from '../../Entities/Task';

interface ITaskRepository {
    createTask(userId: string, title: string, description: string, done: boolean, created_at: Date, updated_at: Date): Promise<void>;
    listTask(userId: string, title: string): Promise<Task[]>;
}

export { ITaskRepository };