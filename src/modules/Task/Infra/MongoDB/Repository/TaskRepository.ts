import { ObjectId } from 'mongodb';
import { databaseConnect } from '../../../../../shared/mongodb';
import { Task } from '../../../Entities/Task';
import { ITaskRepository } from '../ITaskRepository';

class TaskRepository implements ITaskRepository {
  async findTaskById(taskId: string): Promise<Task[]> {
    const db = await databaseConnect();
    const filter = { _id: new ObjectId(taskId) };
    const task = db
      .collection('Tasks')
      .find(filter)
      .toArray() as unknown as Task[];
    return task;
  }

  async deleteTaskById(taskId: string, userId: string): Promise<void> {
    const db = await databaseConnect();
    const filter = { _id: new ObjectId(taskId), userId: userId };
    await db.collection('Tasks').findOneAndDelete(filter);
  }

  async updatedTask(
    userId: string,
    taskId: string,
    title: string,
    description: string,
    done: boolean,
    updated_at: Date
  ): Promise<void> {
    const db = await databaseConnect();
    const filter = { _id: new ObjectId(taskId), userId: userId };
    const update = {
      $set: {
        title: title,
        description: description,
        done: done,
        updated_at: updated_at,
      },
    };
    db.collection('Tasks').findOneAndUpdate(filter, update);
  }

  async listTaskById(taskId: string): Promise<Task> {
    const db = await databaseConnect();
    const filter = { _id: new ObjectId(taskId) };
    const task = (await db
      .collection('Tasks')
      .findOne(filter)) as unknown as Task;
    return task;
  }

  async findTasksByTitleOrStatus(
    userId: string,
    title: string,
    done: boolean
  ): Promise<Task[]> {
    const db = await databaseConnect();

    const filter = {};
    if (title !== undefined) {
      Object.assign(filter, { $text: { $search: title } });
    }

    if (done === true) {
      Object.assign(filter, { done: true });
    }

    const tasks = (await db
      .collection('Tasks')
      .find(filter)
      .toArray()) as unknown as Task[];

    const taskFilterDone = tasks.filter((task) => {
      if (task.userId === userId) {
        return true;
      }

      if (task.userId === userId) {
        return true;
      }
    });

    return taskFilterDone;
  }

  async createTask(
    userId: string,
    title: string,
    description: string,
    done: boolean,
    created_at: Date,
    updated_at: Date
  ): Promise<void> {
    const db = await databaseConnect();
    db.collection('Tasks').insertOne({
      userId,
      title,
      description,
      done,
      created_at,
      updated_at,
    });
  }
}

export { TaskRepository };
