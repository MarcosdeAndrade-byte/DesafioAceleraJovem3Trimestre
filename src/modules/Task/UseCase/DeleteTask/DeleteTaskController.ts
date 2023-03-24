import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteTaskUseCase } from './DeleteTaskUseCase';

class DeleteTaskController {
    async handle(request: Request, response: Response): Promise<void> {
        const { taskId, userId } = request.body;
        const createTaskUseCase = container.resolve(DeleteTaskUseCase);
        await createTaskUseCase.execute(taskId, userId);
        response.status(200).send('OK');
    }
}

export { DeleteTaskController };