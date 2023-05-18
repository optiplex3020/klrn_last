import React, {useState, createContext} from 'react';
import { useContext } from 'react';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext([{}, () => {}]);

const UserProvider = (children) => {
    return createUserWithEmailAndPassword(email, password)
    const [state, setState] = useState({
        username: "",
        email: "",
        uid: "",
        isLoggedIn: null,
    });

    return <UserContext.Provider value={[state, setState]}>{children}</UserContext.Provider>
};

function useUserAuth() {
    return useContext(UserContext);
}

export { UserContext, UserProvider, useUserAuth };