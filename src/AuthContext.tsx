import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth, provider, signInWithPopup, signOut } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { jwtDecode } from "jwt-decode";

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
  cart: Product[];
  addToCart: (product: Product) => void;
}


interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  quantity?: number; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [cart, setCart] = useState<Product[]>([]);

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
      setCart([]);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const addToCart = (product: Product) => {
    setCart((prevCart ) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <AuthContext.Provider value={{ user, decodedToken, login, logout, cart, addToCart }}>
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
