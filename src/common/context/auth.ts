import { createContext, Context } from 'react';


interface IAuthContext {
    isLoggedIn: boolean,
    userId    : string,
    token     : string,
    login     : (userId: string, responseToken: string) => void,
    logout    : () => void
};


const AuthContext: Context<IAuthContext> = createContext<IAuthContext>({
    isLoggedIn: false,
    userId    : '',
    token     : '',
    login     : (userId: string, responseToken: string) => null,
    logout    : () => null
});


export default AuthContext;