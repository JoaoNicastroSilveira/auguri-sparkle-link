import { Card } from '@/components/ui/card';

interface SpecsCardProps {
  material: string;
  peso: number;
  dimensoes?: string;
  acabamento: string;
}

export function SpecsCard({ material, peso, dimensoes, acabamento }: SpecsCardProps) {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3">Especificações</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Material:</span>
          <span className="font-medium text-foreground">{material}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Peso:</span>
          <span className="font-medium text-foreground">{peso}g</span>
        </div>
        {dimensoes && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Dimensões:</span>
            <span className="font-medium text-foreground">{dimensoes}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Acabamento:</span>
          <span className="font-medium text-foreground">{acabamento}</span>
        </div>
      </div>
    </Card>
  );
}
