import { connect } from '../../../../../shared/mongodb';
import { Task } from '../../../Entities/Task';
import { ITaskRepository } from '../ITaskRepository';

class TaskRepository implements ITaskRepository{
    async listTask(userId: string, title: string): Promise<Task[]> {
        const db = await connect();
        await db.collection('tasks').createIndex({ title: 'text' });
        const filter = { $text: { $search: title } };

        const tasks = await db.collection('Tasks').find(filter).toArray()  as unknown as Task[];
        const taskFilterDone = tasks.filter((task) => (task.done === true) && (task.userId === userId));

        return taskFilterDone;
    }

    async createTask(userId: string, title: string, description: string, done: boolean, created_at: Date, updated_at: Date): Promise<void> {
        const db = await connect();
        db.collection('Tasks').insertOne({ userId, title, description, done, created_at, updated_at});
    }

}

export { TaskRepository };