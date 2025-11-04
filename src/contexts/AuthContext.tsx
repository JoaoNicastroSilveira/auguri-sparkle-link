import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService } from '@/services/authService';
import { ProductService } from '@/services/productService';
import { OrderService } from '@/services/orderService';
import { Lojista } from '@/types/Lojista';
import { PedidoStatus } from '@/types/Pedido';

interface AuthContextType {
  lojista: Lojista | null;
  isAuthenticated: boolean;
  isTestUser: boolean;
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

const TEST_USER_ID = 'test-user-001';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [lojista, setLojista] = useState<Lojista | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Inicializar test user
        const testUser = AuthService.initTestUser();
        
        // Garantir que os produtos estão carregados
        ProductService.getAll();

        // Criar pedidos de exemplo se não existirem
        const existingOrders = OrderService.getByUserId(TEST_USER_ID);
        if (existingOrders.length === 0) {
          // Pedido 1 - Entregue
          OrderService.create(
            TEST_USER_ID,
            testUser.nomeLoja,
            [
              { produtoId: 'prod_001', nome: 'Gargantilha Veneziana', referencia: 'GAR-VEN-001', quantidade: 2 },
              { produtoId: 'prod_002', nome: 'Anel Solitário Classic', referencia: 'ANE-SOL-002', quantidade: 1 }
            ],
            'Pedido urgente para casamento'
          );
          const pedido1 = OrderService.getByUserId(TEST_USER_ID)[0];
          if (pedido1) {
            pedido1.createdAt = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
            OrderService.updateStatus(pedido1.id, PedidoStatus.ENTREGUE);
          }

          // Pedido 2 - Confirmado
          OrderService.create(
            TEST_USER_ID,
            testUser.nomeLoja,
            [
              { produtoId: 'prod_003', nome: 'Brinco Argola Grande', referencia: 'BRI-ARG-003', quantidade: 3 },
              { produtoId: 'prod_004', nome: 'Pulseira Cartier', referencia: 'PUL-CAR-004', quantidade: 1 }
            ]
          );
          const pedido2 = OrderService.getByUserId(TEST_USER_ID)[1];
          if (pedido2) {
            pedido2.createdAt = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
            OrderService.updateStatus(pedido2.id, PedidoStatus.CONFIRMADO);
          }

          // Pedido 3 - Pendente
          OrderService.create(
            TEST_USER_ID,
            testUser.nomeLoja,
            [
              { produtoId: 'prod_005', nome: 'Piercing Nariz Delicado', referencia: 'PIE-NAR-005', quantidade: 1 }
            ],
            'Cliente VIP - priorizar'
          );
        }

        // Verificar se existe usuário salvo
        const savedUser = AuthService.getCurrentUser();
        if (savedUser) {
          setLojista(savedUser);
        } else {
          // Auto-login com test user
          AuthService.setCurrentUser(testUser);
          setLojista(testUser);
        }
      } catch (error) {
        console.error('Erro ao inicializar app:', error);
      } finally {
        setInitialized(true);
      }
    };

    initializeApp();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = AuthService.login(email, password);
      if (user) {
        setLojista(user);
        return { success: true };
      }
      return { success: false, error: 'Email ou senha incorretos' };
    } catch (error) {
      return { success: false, error: 'Erro ao fazer login' };
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const newUser = AuthService.register({
        email: data.email,
        senha: data.password,
        nomeLoja: data.nome,
        cnpj: data.cnpj,
        telefone: data.telefone
      });
      setLojista(newUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro ao cadastrar' };
    }
  };

  const logout = () => {
    AuthService.logout();
    setLojista(null);
  };

  const isTestUser = lojista?.id === TEST_USER_ID;

  if (!initialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={{
      lojista,
      isAuthenticated: !!lojista,
      isTestUser,
      login,
      register,
      logout
    }}>
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
