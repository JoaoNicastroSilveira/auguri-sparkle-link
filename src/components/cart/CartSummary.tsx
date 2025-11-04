import { Card } from '@/components/ui/card';

interface CartSummaryProps {
  totalItems: number;
}

export function CartSummary({ totalItems }: CartSummaryProps) {
  return (
    <Card className="p-4 bg-muted/50">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">Total de Itens</span>
        <span className="text-lg font-bold text-foreground">{totalItems}</span>
      </div>
    </Card>
  );
}
