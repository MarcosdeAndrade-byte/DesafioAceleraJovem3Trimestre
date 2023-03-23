import { container } from 'tsyringe';
import { IUserRepository } from '../../modules/User/Infra/MongoDB/IUserRepository';
import { UserRepository } from '../../modules/User/Infra/MongoDB/Repository/UserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);