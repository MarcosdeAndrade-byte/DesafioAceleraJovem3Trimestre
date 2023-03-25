// Tipo criado para Tipar corretamente o array que guarda o refresh token e a data que ele foi criado
export type RefreshArray = {
    refreshToken: string,
    created_at: Date,
}

class User {
    _id!: string;
    refresh_token: RefreshArray[];
    name: string;
    email: string;
    password: string;

    constructor(name:string, email: string, password: string, _id: string, refresh_token: RefreshArray[]) {
        this.name = name;
        this.email =email;
        this.password = password;
        this._id = _id;
        this.refresh_token = refresh_token;
    }
}

export { User };