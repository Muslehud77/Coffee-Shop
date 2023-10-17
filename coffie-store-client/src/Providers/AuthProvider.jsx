import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import auth from '../Firebase/firebase.config';

export const AuthContext = createContext(null) 
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
const [user, setUser] = useState({});
const [loading,setLoading] = useState(true)



const register = (email,password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
}
const login = (email,password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password)
}
const googleSignIn = ()=>{
    setLoading(true);
    return signInWithPopup(auth,googleProvider)
}
const logOut = ()=>{
    setLoading(true);
    return signOut(auth)
}

useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        setLoading(false)
    })
    return ()=> unSubscribe()
},[])

const authInfo = { user,register,login,googleSignIn,logOut,loading };


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;