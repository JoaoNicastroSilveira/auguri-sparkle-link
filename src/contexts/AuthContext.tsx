import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginLojista, registerLojista, getLojistas } from '@/utils/storage';
import { Lojista } from '@/utils/storage';
import { mockProducts } from '@/data/mockProducts';
import * as storage from '@/utils/storage';

// Test user para auto-login
const TEST_USER: Lojista = {
  id: 'test-user-001',
  email: 'teste@auguri.com',
  senha: '123456',
  nome_loja: 'Joalheria Bella Vista',
  cnpj: '12.345.678/0001-90',
  telefone: '(11) 98765-4321',
  aprovado: true,
  created_at: '2024-06-10T00:00:00.000Z'
};

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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [lojista, setLojista] = useState<Lojista | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Inicializar dados mockados se não existirem
        const produtos = await storage.getProdutos();
        if (produtos.length === 0) {
          await storage.saveProdutos(mockProducts);
        }

        // Inicializar lojistas com TEST_USER
        const lojistas = await getLojistas();
        if (lojistas.length === 0) {
          localStorage.setItem('lojistas', JSON.stringify([TEST_USER]));
        }

        // Criar pedidos de exemplo para TEST_USER
        const pedidosExistentes = await storage.getAllPedidos();
        if (pedidosExistentes.length === 0) {
          const pedidosExemplo = [
            {
              id: 'order_001',
              lojista_id: TEST_USER.id,
              lojista_nome: TEST_USER.nome_loja,
              produtos: [
                { produto_id: 'prod_001', nome: 'Gargantilha Veneziana', referencia: 'GAR-VEN-001', quantidade: 2 },
                { produto_id: 'prod_007', nome: 'Anel Solitário', referencia: 'ANE-SOL-007', quantidade: 1 }
              ],
              observacoes: 'Pedido urgente para casamento',
              status: 'entregue' as const,
              created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: 'order_002',
              lojista_id: TEST_USER.id,
              lojista_nome: TEST_USER.nome_loja,
              produtos: [
                { produto_id: 'prod_013', nome: 'Brinco Argola Média', referencia: 'BRI-ARG-013', quantidade: 3 },
                { produto_id: 'prod_019', nome: 'Pulseira Cartier', referencia: 'PUL-CAR-019', quantidade: 1 }
              ],
              observacoes: '',
              status: 'confirmado' as const,
              created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: 'order_003',
              lojista_id: TEST_USER.id,
              lojista_nome: TEST_USER.nome_loja,
              produtos: [
                { produto_id: 'prod_002', nome: 'Gargantilha Cartier', referencia: 'GAR-CAR-002', quantidade: 1 }
              ],
              observacoes: 'Cliente VIP - priorizar',
              status: 'pendente' as const,
              created_at: new Date().toISOString()
            }
          ];
          localStorage.setItem('pedidos', JSON.stringify(pedidosExemplo));
          localStorage.setItem(`pedidos:${TEST_USER.id}`, JSON.stringify(['order_001', 'order_002', 'order_003']));
        }

        // Check for existing session
        const savedUserId = localStorage.getItem('userId');
        if (savedUserId) {
          const lojistas = await getLojistas();
          const savedLojista = lojistas.find((l: Lojista) => l.id === savedUserId);
          if (savedLojista) {
            setLojista(savedLojista);
            setInitialized(true);
            return;
          }
        }

        // Auto-login com TEST_USER se não houver usuário logado
        localStorage.setItem('userId', TEST_USER.id);
        setLojista(TEST_USER);
      } catch (error) {
        console.error('Erro ao inicializar app:', error);
      } finally {
        setInitialized(true);
      }
    };

    initializeApp();
  }, []);

  const login = async (email: string, password: string) => {
    const result = await loginLojista(email, password);
    
    if (result.success && result.lojista) {
      localStorage.setItem('userId', result.lojista.id);
      setLojista(result.lojista);
    }
    
    return result;
  };

  const register = async (data: RegisterData) => {
    const result = await registerLojista({
      email: data.email,
      senha: data.password,
      nome_loja: data.nome,
      cnpj: data.cnpj,
      telefone: data.telefone,
      aprovado: false
    });
    
    return result;
  };

  const logout = () => {
    localStorage.removeItem('userId');
    setLojista(null);
  };

  const isTestUser = lojista?.id === TEST_USER.id;

  if (!initialized) {
    return null; // ou um loading spinner
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
