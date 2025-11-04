import { StorageService } from './storageService';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import { CartItem } from '@/types/CartItem';

export class CartService {
  static getItems(userId: string): CartItem[] {
    return StorageService.get<CartItem[]>(`${STORAGE_KEYS.CARRINHO}:${userId}`) || [];
  }

  static addItem(userId: string, produtoId: string, quantidade: number = 1): void {
    const items = this.getItems(userId);
    const existingIndex = items.findIndex(item => item.produtoId === produtoId);

    if (existingIndex >= 0) {
      items[existingIndex].quantidade += quantidade;
    } else {
      items.push({
        id: crypto.randomUUID(),
        produtoId,
        quantidade,
        addedAt: new Date().toISOString()
      });
    }

    StorageService.set(`${STORAGE_KEYS.CARRINHO}:${userId}`, items);
  }

  static updateQuantity(userId: string, itemId: string, quantidade: number): void {
    const items = this.getItems(userId);
    const index = items.findIndex(item => item.id === itemId);
    
    if (index >= 0 && quantidade > 0) {
      items[index].quantidade = quantidade;
      StorageService.set(`${STORAGE_KEYS.CARRINHO}:${userId}`, items);
    }
  }

  static removeItem(userId: string, itemId: string): void {
    const items = this.getItems(userId);
    const filtered = items.filter(item => item.id !== itemId);
    StorageService.set(`${STORAGE_KEYS.CARRINHO}:${userId}`, filtered);
  }

  static clear(userId: string): void {
    StorageService.set(`${STORAGE_KEYS.CARRINHO}:${userId}`, []);
  }

  static getObservacoes(userId: string): string {
    return StorageService.get<string>(`${STORAGE_KEYS.OBSERVACOES}:${userId}`) || '';
  }

  static setObservacoes(userId: string, observacoes: string): void {
    StorageService.set(`${STORAGE_KEYS.OBSERVACOES}:${userId}`, observacoes);
  }
}
