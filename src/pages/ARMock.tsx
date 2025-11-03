import { useParams, useNavigate } from 'react-router-dom';
import { X, Camera, HelpCircle } from 'lucide-react';
import { mockProducts } from '@/data/mockProducts';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const ARMock = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = mockProducts.find(p => p.id === id);
  const { addItem } = useCart();

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  const handleAddToCart = () => {
    addItem(product);
    toast.success('✅ Adicionado ao pedido');
    navigate(-1);
  };

  const getARPositioning = () => {
    switch (product.categoria) {
      case 'brincos':
        return 'Posicione seu rosto na câmera para ver os brincos';
      case 'aneis':
        return 'Mostre sua mão para visualizar o anel';
      case 'gargantilhas':
      case 'colares':
        return 'Posicione seu pescoço na câmera para ver o colar';
      default:
        return 'Posicione-se na câmera para visualizar a joia';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Mock Camera View with Overlay */}
      <div className="relative w-full h-full">
        {/* Simulated camera background - in reality, this would be camera feed */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center space-y-4 text-white/80">
            <Camera className="w-20 h-20 mx-auto animate-pulse" />
            <p className="text-lg">{getARPositioning()}</p>
            <p className="text-sm">Mantenha boa iluminação</p>
          </div>
        </div>

        {/* AR Demo Notice */}
        <div className="absolute top-20 left-4 right-4 bg-warning/90 backdrop-blur-sm text-warning-foreground p-4 rounded-xl">
          <div className="flex gap-3">
            <HelpCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold">Esta é uma demonstração</p>
              <p className="text-xs mt-1 opacity-90">
                AR real será implementado na versão iOS nativa. Por enquanto, você pode visualizar a joia em nosso catálogo.
              </p>
            </div>
          </div>
        </div>

        {/* Simulated AR Jewelry Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative animate-pulse">
            <img
              src={product.imagens[0]}
              alt={product.nome}
              className="w-64 h-64 object-contain opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-base"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
            {product.nome}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <div className="space-y-4">
            {/* Capture Button */}
            <div className="flex justify-center">
              <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full border-4 border-white hover:scale-105 transition-base flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-black" />
                </div>
              </button>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              className="w-full h-14 bg-primary hover:bg-primary-light text-primary-foreground font-semibold text-lg"
            >
              🛒 Adicionar ao Pedido
            </Button>
          </div>
        </div>

        {/* Instructions Overlay (first time) */}
        <div className="absolute inset-x-4 bottom-32 bg-black/70 backdrop-blur-sm rounded-xl p-6 text-white space-y-3 animate-fade-in">
          <h3 className="font-semibold text-lg">Como usar o AR</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span>•</span>
              <span>{getARPositioning()}</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Mantenha boa iluminação</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Toque no botão para capturar</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ARMock;
