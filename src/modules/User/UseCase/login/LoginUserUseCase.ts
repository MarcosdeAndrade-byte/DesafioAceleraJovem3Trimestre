import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../Infra/MongoDB/IUserRepository';
import jwt from 'jsonwebtoken';
import { AppError } from '../../../../shared/Errors/AppError';
import { RefreshArray } from '../../Entities/User';
interface IUserLoginResponse {
  user: {
    _id: string;
    email: string;
    name: string;
    password: string;
    refreshToken: RefreshArray[];
  };
  token: string;
}

@injectable()
class LoginUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(email: string, password: string): Promise<IUserLoginResponse> {
    const userByEmail = await this.userRepository.findUserByEmail(email);

    if (!userByEmail) {
      throw new AppError('Senha ou email incorretos', 400);
    }

    const passwordVerification = await compare(password, userByEmail.password);

    if (!passwordVerification) {
      throw new AppError('Senha ou email incorretos', 400);
    }

    const token = jwt.sign({ email }, 'SEGREDO', {
      subject: String(userByEmail._id),
      expiresIn: '2m',
    });

    const refresh_token = jwt.sign({ email }, 'RefreshToken', {
      subject: String(userByEmail._id),
      expiresIn: '30d',
    });

    await this.userRepository.updateRefreshToken(
      userByEmail._id,
      refresh_token,
      new Date()
    );

    const user = await this.userRepository.findUserByEmail(email);

    const userInformationAndToken = {
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        password: user.password,
        refreshToken: user.refresh_token,
      },
      token,
    } as IUserLoginResponse;

    return userInformationAndToken;
  }
}

export { LoginUserUseCase };
