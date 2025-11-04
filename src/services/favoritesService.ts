import { StorageService } from './storageService';
import { STORAGE_KEYS } from '@/constants/storage-keys';

export class FavoritesService {
  static getFavorites(userId: string): string[] {
    return StorageService.get<string[]>(`${STORAGE_KEYS.FAVORITOS}:${userId}`) || [];
  }

  static toggle(userId: string, produtoId: string): void {
    const favorites = this.getFavorites(userId);
    const index = favorites.indexOf(produtoId);

    if (index >= 0) {
      favorites.splice(index, 1);
    } else {
      favorites.push(produtoId);
    }

    StorageService.set(`${STORAGE_KEYS.FAVORITOS}:${userId}`, favorites);
  }

  static isFavorite(userId: string, produtoId: string): boolean {
    const favorites = this.getFavorites(userId);
    return favorites.includes(produtoId);
  }
}
