import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/mockProducts';

export interface CartItem {
  product: Product;
  quantidade: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantidade?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantidade: number) => void;
  clearCart: () => void;
  totalItems: number;
  observacoes: string;
  setObservacoes: (obs: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [observacoes, setObservacoes] = useState('');

  useEffect(() => {
    // Load cart from localStorage
    const saved = localStorage.getItem('cart');
    if (saved) {
      setItems(JSON.parse(saved));
    }
    const savedObs = localStorage.getItem('cart_observacoes');
    if (savedObs) {
      setObservacoes(savedObs);
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('cart_observacoes', observacoes);
  }, [observacoes]);

  const addItem = (product: Product, quantidade: number = 1) => {
    setItems(prevItems => {
      const existing = prevItems.find(item => item.product.id === product.id);
      if (existing) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      }
      return [...prevItems, { product, quantidade }];
    });
  };

  const removeItem = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantidade: number) => {
    if (quantidade <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId ? { ...item, quantidade } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setObservacoes('');
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
