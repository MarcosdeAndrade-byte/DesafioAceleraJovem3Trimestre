import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../Infra/MongoDB/IUserRepository';
import jwt from 'jsonwebtoken';
interface IUserLoginResponse {
    user: {
        id: string,
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
        const user = await this.userRepository.findUserByEmail(email);

        if(!user) {
            throw new Error('Senha ou email incorretos');
        }

        const passwordVerification = await compare(password,user.password);

        if(!passwordVerification) {
            throw new Error('Senha ou email incorretos');
        }

        const token = jwt.sign({},'SEGREDO',{
            subject: String(user.id),
            expiresIn: '1',
        });

        const userInformationAndToken = {
            user,
            token
        } as IUserLoginResponse;

        return userInformationAndToken;
    }
}

export { LoginUserUseCase };