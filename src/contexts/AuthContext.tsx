
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  login: (phone: string) => Promise<void>;
  adminLogin: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se já existe um usuário no localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (phone: string) => {
    // Simplificação para MVP - em produção aqui teríamos verificação via SMS
    setIsLoading(true);
    
    // Simulando uma chamada de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      phone,
      isAdmin: false
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const adminLogin = async (password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simplificação para MVP - em produção usaríamos autenticação real
    // ATENÇÃO: Nunca fazer isso em produção - é apenas para demonstração
    const adminPassword = 'admin123';
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (password === adminPassword) {
      const adminUser: User = {
        id: 'admin',
        phone: 'admin',
        isAdmin: true
      };
      
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
