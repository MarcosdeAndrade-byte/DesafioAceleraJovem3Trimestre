import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

class RefreshTokenController {
    async handle(request: Request, response: Response) {
        try {
            const { token } = request.body || request.query.token || request.headers['X-access-token'];

            const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
            const refreshToken = await refreshTokenUseCase.execute(token);

            response.status(200).json(refreshToken);
        } catch (error) {
            return response.status(400).json(error.message);
        }
    }
}

export { RefreshTokenController };