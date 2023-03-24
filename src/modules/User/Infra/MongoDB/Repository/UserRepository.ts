import { FindOneAndUpdateOptions, ObjectId } from 'mongodb';
import { connect } from '../../../../../shared/mongodb';
import { RefreshArray, User } from '../../../Entities/User';
import { IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {

    async findUserByEmail(email: string): Promise<User> {
        const db = await connect();
        const user = await db.collection('User').findOne({email});
        return user as unknown as User;
    }

    async createUser(name: string, email: string, password: string): Promise<void> {
        const refresh_token: RefreshArray[] = [];
        const db = await connect();
        db.collection('User').insertOne({ name, email, password, refresh_token});
    }

    async updateRefreshToken(id: string, refreshToken: string, created_at: Date): Promise<void> {
        const db = await connect();

        const filter = {_id: new ObjectId(id)};
        const update = {  $set: { refresh_token: [refreshToken, created_at] } };
        const options = { returnOriginal: false } as FindOneAndUpdateOptions;
        await db.collection('User').findOneAndUpdate(filter, update, options);
    }
}

export { UserRepository };