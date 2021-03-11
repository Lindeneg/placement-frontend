import { createContext, Context } from 'react';


interface IAuthContext {
    isLoggedIn: boolean,
    userId    : string,
    login     : (userId: string) => void,
    logout    : () => void
};


const AuthContext: Context<IAuthContext> = createContext<IAuthContext>({
    isLoggedIn: false,
    userId    : '',
    login     : (userId: string) => null,
    logout    : () => null
});


export default AuthContext;