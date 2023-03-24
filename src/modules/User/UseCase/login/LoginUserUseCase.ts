import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../Infra/MongoDB/IUserRepository';
import jwt from 'jsonwebtoken';
interface IUserLoginResponse {
    user: {
        _id: string,
        email: string,
        password: string,
    },
    token: string
}

@injectable()
class LoginUserUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    async execute(email: string, password: string): Promise<IUserLoginResponse> {
        const userByEmail = await this.userRepository.findUserByEmail(email);

        if(!userByEmail) {
            throw new Error('Senha ou email incorretos');
        }

        const passwordVerification = await compare(password,userByEmail.password);

        if(!passwordVerification) {
            throw new Error('Senha ou email incorretos');
        }

        const token = jwt.sign({},'SEGREDO',{
            subject: String(userByEmail._id),
            expiresIn: '2m',
        });

        const refresh_token = jwt.sign({ email },'RefreshToken',{
            subject: String(userByEmail._id),
            expiresIn: '30d',
        });

        await this.userRepository.updateRefreshToken(userByEmail._id, refresh_token, new Date());

        const user = await this.userRepository.findUserByEmail(email);

        const userInformationAndToken = {
            user,
            token
        } as IUserLoginResponse;

        return userInformationAndToken;
    }
}

export { LoginUserUseCase };