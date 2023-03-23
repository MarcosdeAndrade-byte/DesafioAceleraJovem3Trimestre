import { connect } from '../../../../../shared/mongodb';
import { User } from '../../../Entities/User';
import { IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {

    async findUserByEmail(email: string): Promise<User> {
        const db = await connect();
        const user = await db.collection('User').findOne({email});
        return user as unknown as User;
    }

    async createUser(name: string, email: string, password: string): Promise<void> {
        const db = await connect();
        db.collection('User').insertOne({ name, email, password });
    }
}

export { UserRepository };