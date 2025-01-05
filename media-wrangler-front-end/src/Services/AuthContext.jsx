import React, { useState, createContext } from "react";
import { login, logout, checkSession } from "./AuthService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isSignedIn, setIsSignedIn] = useState(false);
  
    const signIn = async (credentials) => {
      const result = await login(credentials);
      if (result.success) {
        setIsSignedIn(true);
        localStorage.setItem('user', JSON.stringify({ isSignedIn: true}));
      } else {
        alert(result.message);
      }
    }
  
    const signOut = async () => {
      const result = await logout();
      if (result.success) {
        setIsSignedIn(false);
        localStorage.removeItem('user');
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