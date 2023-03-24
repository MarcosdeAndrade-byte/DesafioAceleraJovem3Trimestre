import jwt, { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../Infra/MongoDB/IUserRepository';

interface ITokenProperties {
    email: string,
    sub: string,
}

interface IRefreshTokenResponse {
    refresh_token: string,
    token: string,
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    async execute(token: string): Promise<IRefreshTokenResponse> {
        const { email, sub } = verify(token, 'RefreshToken') as  ITokenProperties;
        const userId = sub;

        const user = await this.userRepository.findUserByEmail(email);

        if(!user) {
            throw new Error('Refresh Token não existe!');
        }

        const JWTToken = jwt.sign({ email },'SEGREDO', {
            subject: String(user._id),
            expiresIn: '20s',
        });

        const refreshToken = sign({ email }, 'RefreshToken', {
            subject: userId,
            expiresIn: '30d'
        });

        await this.userRepository.updateRefreshToken(userId, refreshToken, new Date());

        const { refresh_token } = await this.userRepository.findUserByEmail(email);

        return {
            refresh_token: String(refresh_token[0]),
            token: JWTToken
        };
    }
}

export { RefreshTokenUseCase };