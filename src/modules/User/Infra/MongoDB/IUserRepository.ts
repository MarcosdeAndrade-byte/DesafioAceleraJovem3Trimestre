interface IUserRepository {
    createUser(name: string, email: string, password: string): void;
}

export { IUserRepository };