class User {
    id!: string;
    name: string;
    email: string;
    password: string;

    constructor(name:string, email: string, password: string, id: string) {
        this.name = name;
        this.email =email;
        this.password = password;
        this.id = id;
    }
}

export { User };