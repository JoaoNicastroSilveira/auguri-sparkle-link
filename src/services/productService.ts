import { StorageService } from './storageService';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import { Produto } from '@/types/Produto';
import { mockProducts } from '@/data/mockProducts';

export class ProductService {
  static getAll(): Produto[] {
    let produtos = StorageService.get<Produto[]>(STORAGE_KEYS.PRODUTOS);
    
    if (!produtos || produtos.length === 0) {
      // Primeira vez, popula com mock data existente
      produtos = mockProducts.map(p => ({
        id: p.id,
        nome: p.nome,
        referencia: p.referencia,
        categoria: p.categoria as any,
        descricao: p.descricao,
        material: p.material,
        peso: p.peso,
        dimensoes: p.dimensoes,
        acabamento: p.acabamento,
        imagens: p.imagens,
        estoque: p.estoque,
        temAR: p.temAR,
        createdAt: new Date().toISOString()
      }));
      StorageService.set(STORAGE_KEYS.PRODUTOS, produtos);
    }
    
    return produtos;
  }

  static getById(id: string): Produto | null {
    const produtos = this.getAll();
    return produtos.find(p => p.id === id) || null;
  }

  static updateStock(id: string, quantidade: number): boolean {
    const produtos = this.getAll();
    const index = produtos.findIndex(p => p.id === id);
    
    if (index >= 0) {
      produtos[index].estoque = quantidade;
      return StorageService.set(STORAGE_KEYS.PRODUTOS, produtos);
    }
    
    return false;
  }
}
