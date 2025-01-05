import React, { useState, createContext } from "react";
import { checkSession, login, logout } from "./AuthService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isSignedIn, setIsSignedIn] = useState(false);
  
    const signIn = async (credentials) => {
      const result = await login(credentials);
      if (result.success) {
        setIsSignedIn(true);
      } else {
        alert(result.message);
      }
    }
  
    const signOut = async () => {
      const result = await logout();
      if (result.success) {
        setIsSignedIn(false);
      } else {
        alert(result.message);
      }
    };

    React.useEffect(() => {
      const verifySession = async () => {
        const session = await checkSession();
        if (session.success) {
          setIsSignedIn(true);
        }
      };
      verifySession();
    }, []);
  
    return (
      <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
        {children}
      </AuthContext.Provider>
    )
  }