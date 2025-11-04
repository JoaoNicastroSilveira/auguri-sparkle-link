import { Heart } from 'lucide-react';
import { Product } from '@/data/mockProducts';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import { StockBadge } from '@/components/product/StockBadge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addItem } = useCart();
  const favorite = isFavorite(product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product.id);
    toast.success(favorite ? 'Removido dos favoritos' : '✅ Adicionado aos favoritos');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.estoque > 0) {
      addItem(product);
      toast.success('✅ Adicionado ao pedido');
    } else {
      toast.info('Produto disponível sob encomenda');
    }
  };

  return (
    <Link to={`/produto/${product.id}`} className="block">
      <div className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-smooth overflow-hidden group">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.imagens[0]}
            alt={product.nome}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-base hover:bg-card"
          >
            <Heart
              className={cn(
                "w-5 h-5 transition-base",
                favorite ? "fill-destructive text-destructive animate-heart-beat" : "text-muted-foreground"
              )}
            />
          </button>
          {product.temAR && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded font-semibold">
              AR
            </div>
          )}
        </div>
        
        <div className="p-3 space-y-2">
          <div className="space-y-1">
            <h3 className="font-semibold text-sm line-clamp-2 text-foreground group-hover:text-primary transition-base">
              {product.nome}
            </h3>
            <p className="text-xs text-muted-foreground">Ref: {product.referencia}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded font-medium">
              {product.material}
            </span>
            <StockBadge estoque={product.estoque} />
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-2 bg-primary/10 text-primary text-sm font-medium rounded-lg hover:bg-primary hover:text-primary-foreground transition-base"
          >
            Ver Detalhes
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
