export type Login = {
    email: string;
    password: string;
    redirectURL: string;
}

export type AuthState = {
    user: any,
    loading: boolean
}

export type LoginResults = {
    message: string;
    user: any;
    token: string;
}