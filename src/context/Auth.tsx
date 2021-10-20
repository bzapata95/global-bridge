import { createContext, useCallback, useContext, useState } from "react";
import { AUTHENTICATE_USER_DATA } from "../utils/constants";
import { IUser } from "./IndexedDBContext";

interface AuthContextData {
  user: IUser;
  login: (data: IUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser>(() => {
    const storageValue = localStorage.getItem(AUTHENTICATE_USER_DATA);
    if (storageValue && storageValue !== undefined) {
      return JSON.parse(storageValue);
    }
    return {} as IUser;
  });

  const login = useCallback(async (data: IUser) => {
    setUser(data);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTHENTICATE_USER_DATA);

    setUser({} as IUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("userAuth must be used within a AuthProvider ");
  }

  return context;
}

export { AuthProvider, useAuth };
