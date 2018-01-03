export class User {

    id : string;
    login : string;
    password : string;
    fullName : string;
    role : string;

    constructor(id?: string, login?: string, password?: string, fullName?: string, role?: string) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.fullName = fullName;
        this.role = role;
    }

}