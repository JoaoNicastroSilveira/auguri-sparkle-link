export enum ProdutoCategoria {
  GARGANTILHAS = 'gargantilhas',
  ANEIS = 'aneis',
  BRINCOS = 'brincos',
  PULSEIRAS = 'pulseiras',
  PIERCINGS = 'piercings',
  COLARES = 'colares'
}

export enum StockStatus {
  IN_STOCK = 'in_stock',
  LOW_STOCK = 'low_stock',
  OUT_OF_STOCK = 'out_of_stock'
}

export interface Produto {
  id: string;
  nome: string;
  referencia: string;
  categoria: ProdutoCategoria;
  descricao: string;
  material: string;
  peso: number;
  dimensoes?: string;
  acabamento: string;
  imagens: string[];
  estoque: number;
  temAR: boolean;
  createdAt: string;
}
