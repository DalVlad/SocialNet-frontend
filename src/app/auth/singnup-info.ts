export class SignupInfo {
    login: string;
    password: string;
    user_name: string;

    constructor(login: string, password: string, user_name: string) {
        this.login = login;
        this.password = password;
        this.user_name = user_name;
    }
}