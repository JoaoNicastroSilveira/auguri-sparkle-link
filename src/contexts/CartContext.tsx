import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartService } from '@/services/cartService';
import { ProductService } from '@/services/productService';
import { useAuth } from './AuthContext';
import { Product } from '@/data/mockProducts';

export interface CartItem {
  product: Product;
  quantidade: number;
  cartItemId: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantidade?: number) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantidade: number) => void;
  clearCart: () => void;
  totalItems: number;
  observacoes: string;
  setObservacoes: (obs: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { lojista } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [observacoes, setObservacoesState] = useState('');

  useEffect(() => {
    if (lojista) {
      loadCart();
    }
  }, [lojista]);

  const loadCart = () => {
    if (!lojista) return;
    
    const cartItems = CartService.getItems(lojista.id);
    const produtos = ProductService.getAll();
    
    const itemsWithProducts: CartItem[] = cartItems
      .map(item => {
        const produto = produtos.find(p => p.id === item.produtoId);
        if (!produto) return null;
        
        // Convert Produto to Product format
        const productItem: Product = {
          ...produto,
          created_at: produto.createdAt
        } as Product;
        
        return {
          product: productItem,
          quantidade: item.quantidade,
          cartItemId: item.id
        };
      })
      .filter((item): item is CartItem => item !== null);
    
    setItems(itemsWithProducts);
    setObservacoesState(CartService.getObservacoes(lojista.id));
  };

  const addItem = (product: Product, quantidade: number = 1) => {
    if (!lojista) return;
    
    CartService.addItem(lojista.id, product.id, quantidade);
    loadCart();
  };

  const removeItem = (cartItemId: string) => {
    if (!lojista) return;
    
    CartService.removeItem(lojista.id, cartItemId);
    loadCart();
  };

  const updateQuantity = (cartItemId: string, quantidade: number) => {
    if (!lojista) return;
    
    if (quantidade <= 0) {
      removeItem(cartItemId);
      return;
    }
    
    CartService.updateQuantity(lojista.id, cartItemId, quantidade);
    loadCart();
  };

  const clearCart = () => {
    if (!lojista) return;
    
    CartService.clear(lojista.id);
    setItems([]);
    setObservacoesState('');
  };

  const setObservacoes = (obs: string) => {
    if (!lojista) return;
    
    CartService.setObservacoes(lojista.id, obs);
    setObservacoesState(obs);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantidade, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      observacoes,
      setObservacoes
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
