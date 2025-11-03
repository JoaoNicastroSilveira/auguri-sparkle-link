import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Minus, Plus, Smartphone } from 'lucide-react';
import { mockProducts } from '@/data/mockProducts';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = mockProducts.find(p => p.id === id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addItem } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantidade, setQuantidade] = useState(1);

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  const favorite = isFavorite(product.id);

  const handleFavorite = () => {
    toggleFavorite(product.id);
    toast.success(favorite ? 'Removido dos favoritos' : '✅ Adicionado aos favoritos');
  };

  const handleAddToCart = () => {
    if (product.estoque > 0 && quantidade > product.estoque) {
      toast.error(`Apenas ${product.estoque} unidades disponíveis`);
      return;
    }
    addItem(product, quantidade);
    toast.success('✅ Adicionado ao pedido');
  };

  const getStockInfo = () => {
    if (product.estoque === 0) {
      return { text: 'Sob encomenda', className: 'bg-muted text-muted-foreground' };
    }
    if (product.estoque <= 3) {
      return { text: `Últimas ${product.estoque} unidades`, className: 'bg-warning/20 text-warning-foreground' };
    }
    return { text: `Em estoque (${product.estoque} unidades)`, className: 'bg-success/20 text-success' };
  };

  const stockInfo = getStockInfo();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border p-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-muted rounded-full transition-base">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold flex-1 truncate">Detalhes do Produto</h1>
        <button
          onClick={handleFavorite}
          className="p-2 hover:bg-muted rounded-full transition-base"
        >
          <Heart
            className={cn(
              "w-6 h-6 transition-base",
              favorite ? "fill-destructive text-destructive" : "text-muted-foreground"
            )}
          />
        </button>
      </header>

      {/* Image Gallery */}
      <div className="bg-muted">
        <div className="aspect-square relative">
          <img
            src={product.imagens[selectedImage]}
            alt={product.nome}
            className="w-full h-full object-cover"
          />
          {product.temAR && (
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
              AR Disponível
            </div>
          )}
        </div>
        <div className="flex gap-2 p-4 overflow-x-auto">
          {product.imagens.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={cn(
                "flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-base",
                selectedImage === idx ? "border-primary" : "border-transparent"
              )}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-6">
        <div className="space-y-3">
          <div>
            <h1 className="text-2xl font-bold text-primary">{product.nome}</h1>
            <p className="text-sm text-muted-foreground">Ref: {product.referencia}</p>
          </div>

          <div className="flex gap-2">
            <span className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm font-medium">
              {product.material}
            </span>
            <span className={cn("px-3 py-1 rounded-full text-sm font-medium", stockInfo.className)}>
              {stockInfo.text}
            </span>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-card rounded-xl p-4 shadow-card space-y-3">
          <h2 className="font-semibold text-lg">Especificações</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Material:</span>
              <p className="font-medium">{product.material}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Peso:</span>
              <p className="font-medium">{product.peso}g</p>
            </div>
            {product.dimensoes && (
              <div>
                <span className="text-muted-foreground">Dimensões:</span>
                <p className="font-medium">{product.dimensoes}</p>
              </div>
            )}
            <div>
              <span className="text-muted-foreground">Acabamento:</span>
              <p className="font-medium">{product.acabamento}</p>
            </div>
          </div>
        </div>

        {/* AR Preview */}
        {product.temAR && (
          <Button
            onClick={() => navigate(`/ar-mock/${product.id}`)}
            className="w-full h-14 bg-gradient-to-r from-primary to-primary-light text-primary-foreground font-semibold gap-2"
          >
            <Smartphone className="w-5 h-5" />
            Experimentar em AR
          </Button>
        )}

        {/* Description */}
        <div className="space-y-2">
          <h2 className="font-semibold text-lg">Descrição</h2>
          <p className="text-muted-foreground leading-relaxed">{product.descricao}</p>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between bg-card rounded-xl p-4 shadow-card">
          <span className="font-medium">Quantidade</span>
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="outline"
              onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-12 text-center font-semibold">{quantidade}</span>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                if (product.estoque === 0 || quantidade < product.estoque) {
                  setQuantidade(quantidade + 1);
                } else {
                  toast.error('Quantidade máxima atingida');
                }
              }}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
        <Button
          onClick={handleAddToCart}
          className="w-full h-14 gradient-primary text-primary-foreground font-semibold text-lg"
        >
          🛒 Adicionar ao Pedido
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
