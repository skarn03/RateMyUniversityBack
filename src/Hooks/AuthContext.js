import { createContext } from 'react';
export const AuthContext = createContext({
    isLoggedIn: false,
    email: "",
    token: null,
    login: () => { }, logout: () => { }
});