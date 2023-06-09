import { Task } from '../../Entities/Task';
// Interface ITaskRepository para garantir o baixo acoplamento entre tecnologia utilizada no banco de dados e o nosso código
interface ITaskRepository {
  createTask(
    userId: string,
    title: string,
    description: string,
    done: boolean,
    created_at: Date,
    updated_at: Date,
    _id?: string
  ): Promise<void>;
  findTasksByTitleOrStatus(
    userId: string,
    title: string,
    done: boolean
  ): Promise<Task[]>;
  listTaskById(taskId: string): Promise<Task>;
  updatedTask(
    userId: string,
    taskId: string,
    title: string,
    description: string,
    done: boolean,
    updated_at: Date
  ): Promise<void>;
  deleteTaskById(taskId: string, userId: string): Promise<void>;
  findTaskById(taskId: string): Promise<Task[]>;
}

export { ITaskRepository };
