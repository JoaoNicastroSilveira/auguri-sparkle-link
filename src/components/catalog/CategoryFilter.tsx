import { ProdutoCategoria } from '@/types/Produto';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selected: ProdutoCategoria | null;
  onSelect: (category: ProdutoCategoria | null) => void;
}

const CATEGORIES = [
  { value: ProdutoCategoria.GARGANTILHAS, label: 'Gargantilhas' },
  { value: ProdutoCategoria.ANEIS, label: 'Anéis' },
  { value: ProdutoCategoria.BRINCOS, label: 'Brincos' },
  { value: ProdutoCategoria.PULSEIRAS, label: 'Pulseiras' },
  { value: ProdutoCategoria.PIERCINGS, label: 'Piercings' },
  { value: ProdutoCategoria.COLARES, label: 'Colares' }
];

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
      <Button
        variant={selected === null ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSelect(null)}
        className="whitespace-nowrap"
      >
        Todos
      </Button>
      {CATEGORIES.map((cat) => (
        <Button
          key={cat.value}
          variant={selected === cat.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelect(cat.value)}
          className="whitespace-nowrap"
        >
          {cat.label}
        </Button>
      ))}
    </div>
  );
}
