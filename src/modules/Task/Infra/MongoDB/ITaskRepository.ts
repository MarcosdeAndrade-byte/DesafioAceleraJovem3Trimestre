interface ITaskRepository {
    createTask(title: string, description: string, done: boolean, created_at: Date, updated_at: Date): Promise<void>;
}

export { ITaskRepository };