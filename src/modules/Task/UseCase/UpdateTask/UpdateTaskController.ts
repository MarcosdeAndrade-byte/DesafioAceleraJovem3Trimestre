import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdatedTaskUseCase } from './UpdateTaskUseCase';

class UpdatedTaskController {
    async handle(request: Request, response: Response): Promise<void> {
        const { userId,taskId,title,description,done } = request.body;
        const createTaskUseCase = container.resolve(UpdatedTaskUseCase);
        await createTaskUseCase.execute(userId,taskId,title,description,done);
        response.status(200).json('OK');
    }
}

export { UpdatedTaskController };
