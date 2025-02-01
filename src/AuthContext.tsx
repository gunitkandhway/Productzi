import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth, provider, signInWithPopup, signOut } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  exp: number;
  iat: number;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  decodedToken: DecodedToken | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const decoded = jwtDecode<DecodedToken>(token);
          setUser(user);
          setDecodedToken(decoded);
        } catch (error) {
          console.error("Error decoding token", error);
          setUser(null);
          setDecodedToken(null);
        }
      } else {
        setUser(null);
        setDecodedToken(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const decoded = jwtDecode<DecodedToken>(token);
      setUser(result.user);
      setDecodedToken(decoded);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setDecodedToken(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, decodedToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};