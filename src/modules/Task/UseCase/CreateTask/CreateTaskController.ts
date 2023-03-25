import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateTaskUseCase } from './CreateTaskUseCase';

class CreateTaskController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { title, description, done} = request.body;
            const { userId } = request.user;

            const createTaskUseCase = container.resolve(CreateTaskUseCase);
            await createTaskUseCase.execute(userId, title, description, done);

            return response.status(200).send('OK');
        } catch (error) {
            return response.status(400).send(error.message);
        }
    }
}

export { CreateTaskController };