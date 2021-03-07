import { createContext, Context } from 'react';


interface IAuthContext {
    isLoggedIn: boolean,
    login: () => void,
    logout: () => void
};


const AuthContext: Context<IAuthContext> = createContext<IAuthContext>({
    isLoggedIn: false,
    login: () => null,
    logout: () => null
});


export default AuthContext;