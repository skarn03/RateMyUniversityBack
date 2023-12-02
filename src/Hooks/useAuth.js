import { useState,useCallback,useEffect } from "react";
let logoutTimer;
export const useAuth = () => {

    const [token, setToken] = useState(null);
    const [email, setUserEmail] = useState(null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState(null);

    const login = useCallback((email, token, expirationDate) => {
        setToken(token);
        setUserEmail(email);
        const newTokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
        setTokenExpirationDate(newTokenExpirationDate);
        localStorage.setItem('userData', JSON.stringify({
            email: email,
            token: token,
            expiration: newTokenExpirationDate.toISOString()
        }));
    }, []);



    const logout = useCallback(() => {
        setToken(null);
        setUserEmail("");
        setTokenExpirationDate(null);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            login(storedData.email, storedData.token, new Date(storedData.expiration));
        }
    }, [login]);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
            return () => {
                clearTimeout(logoutTimer);
            };
        }
    }, [token, tokenExpirationDate, logout]);
    return {token,login,logout,email};
}