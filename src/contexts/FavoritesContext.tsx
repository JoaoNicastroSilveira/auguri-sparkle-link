import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FavoritesService } from '@/services/favoritesService';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { lojista } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (lojista) {
      loadFavorites();
    }
  }, [lojista]);

  const loadFavorites = () => {
    if (!lojista) return;
    const favs = FavoritesService.getFavorites(lojista.id);
    setFavorites(favs);
  };

  const toggleFavorite = (productId: string) => {
    if (!lojista) return;
    
    FavoritesService.toggle(lojista.id, productId);
    loadFavorites();
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};
