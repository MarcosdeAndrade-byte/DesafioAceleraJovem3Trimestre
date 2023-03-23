import { connect } from '../../../../../shared/mongodb';
import { IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {
    async createUser(name: string, email: string, password: string): Promise<void> {
        const db = await connect();
        db.collection('User').insertOne({ name, email, password });
    }
}

export { UserRepository };