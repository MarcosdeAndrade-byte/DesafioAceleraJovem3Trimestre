import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateTaskUseCase } from './CreateTaskUseCase';

class CreateTaskController {
    async handle(request: Request, response: Response): Promise<void> {
        const { title, description, done, created_at, updated_at } = request.body;
        const createTaskUseCase = container.resolve(CreateTaskUseCase);
        await createTaskUseCase.execute(title, description, done, created_at, updated_at);
        response.status(200).send('OK');
    }
}

export { CreateTaskController };