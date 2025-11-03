import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Bell, SlidersHorizontal } from 'lucide-react';
import { mockProducts, categorias } from '@/data/mockProducts';
import ProductCard from '@/components/catalog/ProductCard';
import BottomNav from '@/components/shared/BottomNav';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Catalogo = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [sortBy, setSortBy] = useState('recentes');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll to show/hide filters
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // If scrolling down and past 50px, hide filters
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowFilters(false);
      } 
      // If scrolling up, show filters
      else if (currentScrollY < lastScrollY) {
        setShowFilters(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lastScrollY]);

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        p =>
          p.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.referencia.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(p => p.categoria === selectedCategory);
    }

    // Filter by stock
    if (inStockOnly) {
      filtered = filtered.filter(p => p.estoque > 0);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'recentes':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'menor-preco':
          return a.peso - b.peso;
        case 'maior-preco':
          return b.peso - a.peso;
        case 'az':
          return a.nome.localeCompare(b.nome);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, inStockOnly]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('todos');
    setSortBy('recentes');
    setInStockOnly(false);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Auguri</h1>
              <p className="text-xs text-muted-foreground">DESDE 1970</p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost">
                <Bell className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>
      </header>

      {/* Categories */}
      <div 
        className={`sticky top-[140px] z-30 bg-background border-b border-border pb-3 transition-all duration-300 ${
          showFilters 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex gap-2 overflow-x-auto px-4 pt-3 no-scrollbar">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-base whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat.icon} {cat.nome}
            </button>
          ))}
        </div>
      </div>

      {/* Filters Bar */}
      <div 
        className={`sticky top-[200px] z-30 bg-background border-b border-border px-4 py-3 flex gap-2 transition-all duration-300 ${
          showFilters 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[70vh]">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 mt-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold">Disponibilidade</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Apenas em estoque</span>
                  <Switch checked={inStockOnly} onCheckedChange={setInStockOnly} />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={clearFilters} variant="outline" className="flex-1">
                  Limpar
                </Button>
                <Button onClick={() => setFilterOpen(false)} className="flex-1">
                  Aplicar
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recentes">Mais Recentes</SelectItem>
            <SelectItem value="menor-preco">Menor Peso</SelectItem>
            <SelectItem value="maior-preco">Maior Peso</SelectItem>
            <SelectItem value="az">A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 space-y-2">
            <p className="text-muted-foreground">Nenhum produto encontrado</p>
            <Button variant="outline" onClick={clearFilters}>
              Limpar filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Catalogo;
