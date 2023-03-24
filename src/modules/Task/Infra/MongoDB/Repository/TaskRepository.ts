import { connect } from '../../../../../shared/mongodb';
import { ITaskRepository } from '../ITaskRepository';

class TaskRepository implements ITaskRepository{
    async createTask(userId: string, title: string, description: string, done: boolean, created_at: Date, updated_at: Date): Promise<void> {
        const db = await connect();
        db.collection('Tasks').insertOne({ userId, title, description, done, created_at, updated_at});
    }

}

export { TaskRepository };