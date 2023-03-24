import { Task } from '../../Entities/Task';

interface ITaskRepository {
    createTask(userId: string, title: string, description: string, done: boolean, created_at: Date, updated_at: Date): Promise<void>;
    listTask(userId: string, title: string): Promise<Task[]>;
    listTaskById(taskId: string): Promise<Task>;
    updatedTask(userId: string, taskId: string, title: string, description: string, done: boolean): Promise<void>;
    deleteTaskById(taskId: string, userId: string): Promise<void>;
    findTaskById(taskId: string): Promise<Task>;
}

export { ITaskRepository };