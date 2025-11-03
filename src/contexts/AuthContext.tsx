import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Lojista {
  id: string;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  aprovado: boolean;
  created_at: string;
}

interface AuthContextType {
  lojista: Lojista | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

interface RegisterData {
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [lojista, setLojista] = useState<Lojista | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedLojista = localStorage.getItem('lojista');
    if (savedLojista) {
      setLojista(JSON.parse(savedLojista));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in production, this would call an API
    const mockLojista: Lojista = {
      id: 'user_001',
      nome: 'Joalheria Bella Vista',
      cnpj: '12.345.678/0001-90',
      email: email,
      telefone: '(11) 98765-4321',
      aprovado: true,
      created_at: '2024-06-10'
    };

    localStorage.setItem('lojista', JSON.stringify(mockLojista));
    setLojista(mockLojista);
    return { success: true };
  };

  const register = async (data: RegisterData) => {
    // Mock registration
    const newLojista: Lojista = {
      id: `user_${Date.now()}`,
      nome: data.nome,
      cnpj: data.cnpj,
      email: data.email,
      telefone: data.telefone,
      aprovado: false, // Pending approval
      created_at: new Date().toISOString()
    };

    localStorage.setItem('pendingLojista', JSON.stringify(newLojista));
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('lojista');
    setLojista(null);
  };

  return (
    <AuthContext.Provider value={{ lojista, isAuthenticated: !!lojista, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
