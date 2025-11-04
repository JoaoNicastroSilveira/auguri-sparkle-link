export enum PedidoStatus {
  PENDENTE = 'pendente',
  CONFIRMADO = 'confirmado',
  ENTREGUE = 'entregue',
  CANCELADO = 'cancelado'
}

export interface PedidoProduto {
  produtoId: string;
  nome: string;
  referencia: string;
  quantidade: number;
}

export interface Pedido {
  id: string;
  lojistaId: string;
  lojistaNome: string;
  produtos: PedidoProduto[];
  observacoes?: string;
  status: PedidoStatus;
  createdAt: string;
}
