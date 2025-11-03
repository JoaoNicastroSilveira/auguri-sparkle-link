import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/catalog/ProductCard';
import BottomNav from '@/components/shared/BottomNav';
import { ProductMatch } from '@/utils/imageAnalysis';

const VisualSearchResults = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<ProductMatch[]>([]);
  const [searchImage, setSearchImage] = useState<string>('');

  useEffect(() => {
    // Carregar resultados do sessionStorage
    const savedResults = sessionStorage.getItem('visualSearchResults');
    const savedImage = sessionStorage.getItem('visualSearchImage');
    
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
    
    if (savedImage) {
      setSearchImage(savedImage);
    }
    
    // Se não tiver resultados, redirecionar
    if (!savedResults) {
      navigate('/catalogo');
    }
  }, [navigate]);

  const handleNewSearch = () => {
    sessionStorage.removeItem('visualSearchResults');
    sessionStorage.removeItem('visualSearchImage');
    navigate('/catalogo');
  };

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
        <div className="p-4">
          <button
            onClick={() => navigate('/catalogo')}
            className="flex items-center gap-2 text-primary mb-3"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Busca Visual</span>
          </button>

          {/* Image Preview */}
          {searchImage && (
            <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
              <img
                src={searchImage}
                alt="Busca"
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm">
                  ✨ Encontramos {results.length} {results.length === 1 ? 'joia similar' : 'joias similares'}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Baseado em cores e padrões
                </p>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Results Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {results.map((product) => (
            <div key={product.id} className="relative">
              {/* Similarity Badge */}
              <div className="absolute -top-2 -right-2 z-10">
                <div
                  className={`px-2 py-1 rounded-full text-xs font-bold shadow-lg ${
                    product.matchScore >= 80
                      ? 'bg-gold text-white'
                      : product.matchScore >= 60
                      ? 'bg-success text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {product.matchScore}% Similar
                </div>
              </div>
              
              {/* Top 3 special border */}
              <div
                className={
                  product.matchScore >= 80
                    ? 'ring-2 ring-gold rounded-xl'
                    : ''
                }
              >
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>

        {/* New Search Button */}
        <div className="mt-8 text-center space-y-4">
          <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
            💡 <strong>Em breve:</strong> Resultados ainda mais precisos com Inteligência Artificial!
          </div>
          
          <Button
            onClick={handleNewSearch}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <Camera className="w-5 h-5" />
            Fazer Nova Busca
          </Button>
        </div>
      </div>

      {/* Empty State (if no results after filtering) */}
      {results.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-semibold mb-2">Não encontramos joias similares</h2>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Tente uma foto com melhor iluminação ou de outro ângulo
          </p>
          
          <div className="space-y-2 text-sm text-left bg-muted/50 rounded-lg p-4 mb-6">
            <p className="font-semibold">Dicas:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>✓ Use boa iluminação natural</li>
              <li>✓ Certifique-se que a joia está em foco</li>
              <li>✓ Evite fundos muito coloridos</li>
              <li>✓ Tente fotos de diferentes ângulos</li>
            </ul>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleNewSearch} className="gap-2">
              <Camera className="w-4 h-4" />
              Tentar Outra Foto
            </Button>
            <Button onClick={() => navigate('/catalogo')} variant="outline">
              Voltar ao Catálogo
            </Button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default VisualSearchResults;
