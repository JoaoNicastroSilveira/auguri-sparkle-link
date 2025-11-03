import { useMemo } from 'react';
import { Heart } from 'lucide-react';
import { mockProducts } from '@/data/mockProducts';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/catalog/ProductCard';
import BottomNav from '@/components/shared/BottomNav';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Favoritos = () => {
  const { favorites } = useFavorites();
  const { addItem } = useCart();

  const favoriteProducts = useMemo(() => {
    return mockProducts.filter(p => favorites.includes(p.id));
  }, [favorites]);

  const inStockProducts = favoriteProducts.filter(p => p.estoque > 0);

  const handleAddAllToCart = () => {
    if (inStockProducts.length === 0) {
      toast.error('Nenhum produto em estoque nos favoritos');
      return;
    }
    inStockProducts.forEach(product => addItem(product));
    toast.success(`✅ ${inStockProducts.length} produtos adicionados ao pedido`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border p-4">
        <h1 className="text-2xl font-bold text-primary">Meus Favoritos</h1>
        <p className="text-sm text-muted-foreground">{favoriteProducts.length} itens salvos</p>
      </header>

      {/* Content */}
      <div className="p-4">
        {favoriteProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Você ainda não tem favoritos</h2>
              <p className="text-muted-foreground">
                Explore o catálogo e salve suas peças preferidas
              </p>
            </div>
            <Button onClick={() => window.location.href = '/catalogo'}>
              Explorar Catálogo
            </Button>
          </div>
        ) : (
          <>
            {inStockProducts.length > 0 && (
              <Button
                onClick={handleAddAllToCart}
                className="w-full mb-4 h-12 gradient-primary text-primary-foreground font-semibold"
              >
                🛒 Adicionar todos ao pedido ({inStockProducts.length})
              </Button>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              {favoriteProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Favoritos;
