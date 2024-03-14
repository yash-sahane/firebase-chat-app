import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            // console.log(user);
        })

        return () => unsub();
    }, []);

    return <AuthContext.Provider value={{ currentUser }}>
        {children}
    </AuthContext.Provider>
}