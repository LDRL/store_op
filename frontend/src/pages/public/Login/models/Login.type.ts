export interface ApiLogin{

}


/// Frontend
export interface ILogin{
    email: string;
    password: string;
}

export const LoginEmptyState: ILogin = {
    email: '',
    password: '',
}