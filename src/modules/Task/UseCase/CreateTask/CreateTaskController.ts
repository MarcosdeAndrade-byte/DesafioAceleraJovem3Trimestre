import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateTaskUseCase } from './CreateTaskUseCase';

class CreateTaskController {
    async handle(request: Request, response: Response): Promise<void> {
        const { title, description, done} = request.body;
        const { userId } = request.user;

        const createTaskUseCase = container.resolve(CreateTaskUseCase);
        await createTaskUseCase.execute(userId, title, description, done);
        response.status(200).send('OK');
    }
}

export { CreateTaskController };