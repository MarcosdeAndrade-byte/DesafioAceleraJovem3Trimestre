import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ListTaskUseCase } from './ListTaskUseCase';


class ListTaskController {
    async handle(request: Request, response: Response): Promise<void> {
        const { userId,title } = request.body;
        const createTaskUseCase = container.resolve(ListTaskUseCase);
        const tasks = await createTaskUseCase.execute(userId,title);
        response.status(200).json(tasks);
    }
}

export { ListTaskController };