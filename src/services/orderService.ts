import { StorageService } from './storageService';
import { CartService } from './cartService';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import { Pedido, PedidoProduto, PedidoStatus } from '@/types/Pedido';

export class OrderService {
  static getAll(): Pedido[] {
    return StorageService.get<Pedido[]>(STORAGE_KEYS.PEDIDOS) || [];
  }

  static getByUserId(userId: string): Pedido[] {
    const pedidos = this.getAll();
    return pedidos.filter(p => p.lojistaId === userId);
  }

  static getById(id: string): Pedido | null {
    const pedidos = this.getAll();
    return pedidos.find(p => p.id === id) || null;
  }

  static create(
    userId: string,
    lojistaNome: string,
    produtos: PedidoProduto[],
    observacoes?: string
  ): Pedido {
    const pedido: Pedido = {
      id: crypto.randomUUID(),
      lojistaId: userId,
      lojistaNome,
      produtos,
      observacoes,
      status: PedidoStatus.PENDENTE,
      createdAt: new Date().toISOString()
    };

    const pedidos = this.getAll();
    pedidos.push(pedido);
    StorageService.set(STORAGE_KEYS.PEDIDOS, pedidos);

    // Limpa carrinho e observações após criar pedido
    CartService.clear(userId);
    CartService.setObservacoes(userId, '');

    return pedido;
  }

  static updateStatus(pedidoId: string, status: PedidoStatus): boolean {
    const pedidos = this.getAll();
    const index = pedidos.findIndex(p => p.id === pedidoId);
    
    if (index >= 0) {
      pedidos[index].status = status;
      return StorageService.set(STORAGE_KEYS.PEDIDOS, pedidos);
    }
    
    return false;
  }
}
