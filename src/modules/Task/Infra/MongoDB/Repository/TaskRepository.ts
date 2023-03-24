import { ObjectId } from 'mongodb';
import { connect } from '../../../../../shared/mongodb';
import { Task } from '../../../Entities/Task';
import { ITaskRepository } from '../ITaskRepository';

class TaskRepository implements ITaskRepository{
    async updatedTask(userId: string, taskId: string, title: string, description: string, done: boolean): Promise<void> {
        const db = await connect();
        const filter = {_id: new ObjectId(taskId), userId: userId};
        const update = {  $set: { title: title, description: description, done: done } };
        db.collection('Tasks').findOneAndUpdate(filter,update);
    }

    async listTaskById(taskId: string): Promise<Task> {
        const db = await connect();
        const filter = {_id: new ObjectId(taskId)};
        const task = await db.collection('Tasks').findOne(filter) as unknown as Task;
        return task;
    }

    async listTask(userId: string, title: string): Promise<Task[]> {
        const db = await connect();
        await db.collection('Tasks').createIndex({ title: 'text' });
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