import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdatedTaskUseCase } from './UpdateTaskUseCase';

class UpdatedTaskController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { taskId,title,description,done } = request.body;
            const { userId } = request.user;
            const createTaskUseCase = container.resolve(UpdatedTaskUseCase);
            await createTaskUseCase.execute(userId,taskId,title,description,done);
            return response.status(200).json('OK');
        } catch (error) {
            return response.status(400).send(error.message);
        }
    }
}

export { UpdatedTaskController };
