import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
  name: string;
  id: string;
  avatar: string
}

type AuthContextType = {
  user: User | undefined;
  singInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<User>();    

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const { displayName, photoURL, uid } = user;
  
        if(!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }
        setUser({
          name: displayName,
          avatar: photoURL,
          id: uid
        });
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  async function singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);
    if(result.user) {
      const { displayName, photoURL, uid } = result.user;

      if(!displayName || !photoURL) {
        throw new Error('Missing information from Google Account');
      }
      setUser({
        name: displayName,
        avatar: photoURL,
        id: uid
      });
    }
  } 

  return (
    <AuthContext.Provider value={{ user, singInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}