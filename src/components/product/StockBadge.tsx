import { Badge } from '@/components/ui/badge';

interface StockBadgeProps {
  estoque: number;
}

export function StockBadge({ estoque }: StockBadgeProps) {
  if (estoque === 0) {
    return (
      <Badge variant="secondary" className="text-xs">
        Sob encomenda
      </Badge>
    );
  }
  
  if (estoque <= 3) {
    return (
      <Badge className="text-xs bg-warning/20 text-warning-foreground hover:bg-warning/30">
        Últimas {estoque} unidades
      </Badge>
    );
  }
  
  return (
    <Badge className="text-xs bg-success/20 text-success hover:bg-success/30">
      Em estoque ({estoque})
    </Badge>
  );
}
