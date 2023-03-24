import { connect } from '../../../../../shared/mongodb';
import { ITaskRepository } from '../ITaskRepository';

class TaskRepository implements ITaskRepository{
    async createTask(title: string, description: string, done: boolean, created_at: Date, updated_at: Date): Promise<void> {
        const db = await connect();
        db.collection('Tasks').insertOne({ title, description, done, created_at, updated_at});
    }

}

export { TaskRepository };