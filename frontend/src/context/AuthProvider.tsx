import { useState, useEffect, createContext, ReactNode } from 'react';
import { clearLocalStorage, persistLocalStorage } from '../utils/localStorage.utility';

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  role: number;
}

export const EmptyUserState: UserInfo = {
  id: 0,
  name: "",
  email: "",
  role: 0
};

export const userKey = 'user';

// Crear el contexto
interface AuthContextType {
    auth: UserInfo;
    createUser: (user: UserInfo) => void;
    updateUser: (user: Partial<UserInfo>) => void;
    resetUser: () => void;
    loading: boolean;
    hasRole: (role: number) => boolean;
    
}

const AuthContext = createContext<AuthContextType>({
    auth: EmptyUserState,
    createUser: () => {},
    updateUser: () => {},
    resetUser: () => {},
    loading: true,
    hasRole: () => false,
});

interface AuthProviderProps {
    children: ReactNode;
}

// El Proveedor del Contexto
const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<UserInfo>(EmptyUserState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Cargar el usuario desde localStorage al montar el componente
        const storedUser = localStorage.getItem(userKey);
        console.log(storedUser,"----- init");
        if (storedUser) {
            setAuth(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

   
    const createUser = (user: UserInfo) => {
        setAuth(user);
        persistLocalStorage<UserInfo>(userKey, user);  // Guardar en localStorage
    };

    const updateUser = (user: Partial<UserInfo>) => {
        const updatedUser = { ...auth, ...user };
        setAuth(updatedUser);
        persistLocalStorage<UserInfo>(userKey, updatedUser);  // Guardar en localStorage
    };

    const resetUser = () => {
        setAuth(EmptyUserState);
        clearLocalStorage(userKey);  // Limpiar localStorage
    };
    
    const hasRole = (role: number) => {
        return auth.role === role;
      };
    

    return (
        <AuthContext.Provider value={{ auth, createUser, updateUser, resetUser,loading, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;