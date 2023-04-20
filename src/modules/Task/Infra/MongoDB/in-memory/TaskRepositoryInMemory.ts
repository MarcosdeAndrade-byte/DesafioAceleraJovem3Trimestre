import { Task } from '../../../Entities/Task';
import { ITaskRepository } from '../ITaskRepository';

class TaskRepository implements ITaskRepository {
  private tasks: Task[] = [];

  async findTaskById(taskId: string): Promise<Task[]> {
    const task = this.tasks.filter((t) => t._id === taskId);
    return task;
  }

  async deleteTaskById(taskId: string, userId: string): Promise<void> {
    const index = this.tasks.findIndex(
      (task) => task._id === taskId && task.userId === userId
    );
    if (index >= 0) {
      this.tasks.splice(index, 1);
    }
  }

  async updatedTask(
    userId: string,
    taskId: string,
    title: string,
    description: string,
    done: boolean,
    updated_at: Date
  ): Promise<void> {
    const index = this.tasks.findIndex(
      (task) => task._id === taskId && task.userId === userId
    );
    if (index >= 0) {
      this.tasks[index].title = title;
      this.tasks[index].description = description;
      this.tasks[index].done = done;
      this.tasks[index].updated_at = updated_at;
    }
  }

  async listTaskById(taskId: string): Promise<Task> {
    const task = this.tasks.find((t) => t._id === taskId);
    return task;
  }

  async findTasksByTitleOrStatus(
    userId: string,
    title: string,
    done: boolean
  ): Promise<Task[]> {
    const tasks = this.tasks.filter(
      (task) =>
        task.userId === userId &&
        (!title || task.title.toLowerCase().includes(title.toLowerCase())) &&
        (done === undefined || task.done === done)
    );
    return tasks;
  }

  async createTask(
    userId: string,
    title: string,
    description: string,
    done: boolean,
    created_at: Date,
    updated_at: Date
  ): Promise<void> {
    const task = new Task(
      userId,
      title,
      description,
      done,
      created_at,
      updated_at
    );
    this.tasks.push(task);
  }
}

export { TaskRepository };
